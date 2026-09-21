<script lang="ts">
import { defineAsyncComponent } from 'vue';

export default {
	props: {
		color: {
			type: String,
			default: 'dark'
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
</script>;

<template>
    <div class="text-block" data-size="narrow" :data-color-theme="color">
        <component :is="MarkdownFileContent"/>
    </div>
</template>;

<style scoped lang="scss">
@use '@/mixins' as *;

.text-block {
    padding-block: var(--spacing-xxl);
    z-index: 20;

    &:first-child {
        :deep(.markdown-body) {
            p:first-of-type {
                @include lead-paragraph();
                font-size: var(--font-size-xl);
                text-align: center;
                font-weight: var(--font-weight-bold);

                + p:last-of-type {
                    text-align: center;
                }
            }
        }
    }

    :deep(.markdown-body) {
        h3 {
            background: var(--color-primary);
            color: contrast-color(var(--color-primary));
            padding: var(--spacing-xs) var(--spacing-lg);
            width: fit-content;
            line-height: 1;
            font-family: var(--font-family-accent);
            font-size: var(--font-size-lg);
            transform: rotate(-2deg) translateX(-1rem);
        }
    }

}
</style>;
