<script lang="ts">
export default {};
</script>

<template>
    <footer class="global-footer" data-background="light">
        <p>UniNexus is a fictional concept, developed for SIT317 IT Innovations and Entrepreneurship at Deakin University, Trimester 2 2026.</p>
        <p>This landing page is by Leesa Ward, student ID 217493588. Source code: <a href="https://github.com/doubleedesign/sit317" target="_blank">GitHub</a>.</p>
    </footer>
</template>

<style scoped lang="scss">
@use '@/mixins' as *;

.global-footer {
    --theme-color: var(--color-primary);
    padding-block: var(--spacing-md);
    padding-inline: var(--spacing-md);
    text-align: center;

    p {
        margin-block: var(--spacing-xs);
        font-size: var(--font-size-sm);

        a {
            @include link-underline-on-hover();
        }
    }
}
</style>
