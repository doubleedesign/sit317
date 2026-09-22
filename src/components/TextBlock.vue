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
		content: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	},
	computed: {
		MarkdownFileContent() {
			const name = this.content;

			return defineAsyncComponent(() =>
				import(`@/content/${name}.md`)
			);
		}
	},
	methods: {}
};
</script>

<template>
    <div :class="['text-block', `text-block__${content}`]" data-size="narrow" :data-color-theme="color" :data-background="background">
        <component :is="MarkdownFileContent"/>
    </div>
</template>;

<style scoped lang="scss">
@use '@/mixins' as *;
@use '@/functions' as *;

.text-block {
    padding-block: var(--spacing-xxl);
    z-index: 20;

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
