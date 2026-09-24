<script lang="ts">

export default {
	data() {
		return {
			items: [
				{ label: 'UniNexus on Facebook', icon: '<i class="bi bi-facebook"></i>', url: '#' },
				{ label: 'UniNexus on Instagram', icon: '<i class="bi bi-instagram"></i>', url: '#' },
				{ label: 'UniNexus on YouTube', icon: '<i class="bi bi-youtube"></i>', url: '#' },
				{ label: 'UniNexus on TikTok', icon: '<i class="bi bi-tiktok"></i>', url: '#' },
				{ label: 'UniNexus on Twitch', icon: '<i class="bi bi-twitch"></i>', url: '#' },
				{ label: 'UniNexus on Discord', icon: '<i class="bi bi-discord"></i>', url: '#' },
			]
		};
	}
};
</script>

<template>
    <ul class="social-links">
        <li v-for="(item, index) in items" :key="index">
            <a :href="item.url" :data-tippy-content="item.label" target="_blank" rel="noopener noreferrer" v-html="item.icon"></a>
        </li>
    </ul>
</template>

<style scoped lang="scss">
@use '@/mixins' as *;

.social-links {
    display: flex;
    justify-content: center;
    gap: var(--spacing-xl);
    padding-block: var(--spacing-xl);

    li {
        list-style: none;
        font-size: var(--font-size-xl);

        @include media-breakpoint-up('contained') {
            font-size: var(--font-size-lg);
        }

        a {
            color: var(--color-secondary);

            &:hover, &:focus, &:active {
                color: var(--color-accent);
                opacity: 1;
            }
        }
    }
}
</style>
