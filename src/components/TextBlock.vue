<script lang="ts">
import { defineAsyncComponent } from 'vue';

export default {
	props: {
		color: {
			type: String || undefined,
			default: undefined
		},
		background: {
			type: String || undefined,
			default: undefined
		},
		animation: {
			type: String,
			default: 'fadeIn'
		},
		animationThreshold: {
			type: Number,
			default: 0.5
		},
		content: {
			type: String,
			default: ''
		}
	},
	computed: {
		MarkdownFileContent() {
			const name = this.content;

			return defineAsyncComponent(() =>
				import(`@/content/${name}.md`)
			);
		}
	},
	methods: {
		handleClick(event: MouseEvent) {
			const detailsPanel = (this.$refs.wrapperRef as HTMLElement).querySelector('details[class$="footnotes"]');
			if (!detailsPanel) return;

			// Check if it was a link that was clicked
			const target = event.target as HTMLElement;
			const link = target.closest('a');
			if (!link) return;

			// ...and that it was inside a <sup> element (i.e., is a footnote link)
			const sup = link.closest('sup');
			if (!sup) return;

			// ...and if so, open the panel
			(detailsPanel as HTMLDetailsElement).open = true;
			//  stop the default scroll (to the element) and scroll to the top of the references instead
			event.preventDefault();
			(detailsPanel as HTMLDetailsElement).scrollIntoView({ behavior: 'smooth' });
		}
	},
	mounted() {
		this.$nextTick(() => {
			(this.$el as HTMLElement).addEventListener('click', this.handleClick);
		});
	},
	beforeUnmount() {
		(this.$el as HTMLElement).removeEventListener('click', this.handleClick);
	}
};
</script>

<template>
    <div ref="wrapperRef" :class="['text-block', `text-block__${content}`]" data-size="narrow" :data-color-theme="color" :data-background="background">
        <div class="markdown-wrapper" :data-animate-into-view="animation" :data-animation-threshold="animationThreshold">
            <component :is="MarkdownFileContent"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/mixins' as *;
@use '@/functions' as *;

.text-block {
    padding-block: var(--spacing-xxl);
    z-index: 20;

    .markdown-wrapper {
        height: auto;

        // Set an initial height that will prevent the animations from triggering before the markdown content loads
        &:empty {
            min-height: 100dvh;
        }

        &[data-animation-threshold="0.25"] {
            animation-delay: 0.5s;
        }

        &:has(:deep(.markdown-body blockquote:only-child)) {
            animation-delay: 0.4s;
        }
    }

    &:first-child {
        :deep(.markdown-body) {
            p:first-child {
                @include lead-paragraph();
                font-size: var(--font-size-xl);
                text-align: center;
                font-weight: var(--font-weight-bold);
                color: lighten('accent', 20%);

                + p:last-of-type {
                    font-size: 1.125rem;
                    text-align: center;
                }
            }
        }
    }

    :deep(.markdown-body) {
        h2 {
            @include accent-heading();
        }

        &:not(:has(h2)) {
            h3 {
                @include accent-heading('white');

                &:not(:first-child) {
                    margin-block-start: var(--spacing-lg);
                }
            }
        }
    }

}
</style>;
