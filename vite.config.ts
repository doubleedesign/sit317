import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import Markdown from 'unplugin-vue-markdown/vite';
// @ts-expect-error TS7016: Could not find a declaration file for module markdown-it-footnote.
import MarkdownItFootnote from 'markdown-it-footnote';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue({
			include: [/\.vue$/, /\.md$/],
		}),
		vueDevTools(),
		Markdown({
			markdownOptions: {
				typographer: true,
			},
			markdownSetup(md) {
				md.use(MarkdownItFootnote);
				md.renderer.rules = {
					...md.renderer.rules,

					footnote_block_open: () => {
						return `<footer class="markdown-body__footer">
                            <details class="markdown-body__footer__footnotes">
                                <summary><i class="bi bi-chevron-right"></i>References</summary>
                                <ol>
                        `;
					},
					footnote_block_close: () => {
						return `</ol>
                            </details>
                        </footer>
                        `;
					},
					footnote_open: () => '<li>',
					footnote_close: () => '</li>',
				};
				md.core.ruler.push('footnote_strip_paragraphs', (state) => {
					let inFootnoteBlock = false;
					state.tokens = state.tokens.filter((tok) => {
						if (tok.type === 'footnote_block_open') inFootnoteBlock = true;
						if (tok.type === 'footnote_block_close') inFootnoteBlock = false;
						if (inFootnoteBlock && (tok.type === 'paragraph_open' || tok.type === 'paragraph_close')) {
							return false;
						}

						return true;
					});
				});
			},
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// Suppress Sass deprecation warnings
				quietDeps: true,
			},
		},
	},
});
