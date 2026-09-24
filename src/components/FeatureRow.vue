<script lang="ts">
import TextBlock from '@/components/TextBlock.vue';

export default {
	components: {
		TextBlock
	},
	data() {
		return {
			features: [
				{
					image: 'amistad-cristiana-63aj9m560js-unsplash.jpg',
					title: 'Plan for success with <strong>Initial Peer Matching</strong>',
					description: 'Optionally allow students to enter their course details and interests to be matched with peers most similar to them'
				},
				{
					image: 'brooke-cagle--uHVRvDr7pg-unsplash.jpg',
					title: 'Build community with a <strong>SpeedFriending Series</strong>',
					description: 'Students an rate their interactions and our matching algorithms can progressively match more compatible peers each week'
				},
				{
					image: 'brooke-cagle-tLG2hcpITZE-unsplash.jpg',
					title: '<strong>Easy</strong> for organisers and students alike',
					description: 'Quick, low-demand activities like conversation starters, trivia questions, cooperative puzzles, and card games'
				}
			]
		};
	}
};
</script>

<template>
    <div class="features" data-size="wide" data-background="accent">
        <TextBlock content="features"/>
        <ul class="features__list" data-group-layout="grid" data-max-per-row="3">
            <li v-for="(feature, index) in features" :key="index"
                class="features__list__item"
                data-background="white"
                data-animate-into-view="fadeInLeft"
                data-animation-threshold="0.8"
            >
                <div v-if="feature.image" class="features__list__item__image" data-aspect-ratio="wide">
                    <img :src="`/${feature.image}`" alt=""/>
                </div>
                <div class="features__list__item__inner">
                    <h3 v-html="feature.title"></h3>
                    <p>{{ feature.description }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@use '@/mixins' as *;
@use '@/functions' as *;

.features {
    padding-block-end: var(--spacing-xl);

    @include media-breakpoint-up('contained') {
        padding-block-end: var(--spacing-xxl);
    }

    h2 {
        @include accent-heading();
    }

    :deep(.text-block) {
        padding-block: 0;

        h2 + p {
            font-size: 1.125rem;
        }
    }

    &__list {
        margin: 0;
        padding-block: var(--spacing-xl);

        @include media-breakpoint-up('contained') {
            padding-block: var(--spacing-xxl);
        }

        &__item {
            list-style: none;
            @include curved-shadow();
            display: flex;
            flex-direction: column;

            @include media-breakpoint-up('narrow') {
                &:nth-child(3n+2) {
                    animation-delay: 0.6s;
                }

                &:nth-child(3n+3) {
                    animation-delay: 0.9s;
                }
            }

            &__image {

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    z-index: 5;
                }
            }

            &__inner {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: var(--spacing-lg) !important;
                text-align: center;
                text-wrap: balance;

                h3 {
                    margin: 0;
                    font-weight: var(--font-weight-bold);
                    text-transform: uppercase;
                    font-size: var(--font-size-base);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-primary);

                    :deep(strong) {
                        @include accent-heading('secondary');
                        font-weight: var(--font-weight-bold);
                        white-space: nowrap;
                        line-height: 1;
                        transform: translateX(0);
                        text-transform: none;
                    }
                }

                p {
                    margin-block-end: 0;
                }
            }
        }
    }
}
</style>
