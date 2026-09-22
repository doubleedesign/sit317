<script lang="ts">
// @ts-expect-error TS2307: Cannot find module @/content/hero.md or its corresponding type declarations.
import Content from '@/content/hero.md';

export default {
	props: {},
	components: {
		Content,
	},
	data() {
		return {
			aspectRatio: 'wide'
		};
	},
	computed: {},
	mounted() {
		window.addEventListener('load', this.debounce(this.setAspectRatio, 0));
		window.addEventListener('resize', this.debounce(this.setAspectRatio, 200));
	},
	methods: {
		async setAspectRatio() {
			this.aspectRatio = this.calculateAspectRatio();
		},
		calculateAspectRatio() {
			const { width, height } = this.checkScreenSize();
			if (height < 600) {
				if (width < 600) {
					return 'portrait';
				}
				else {
					return 'square';
				}
			}

			if (width <= 400) {
				return 'portrait';
			}

			if (width <= 600) {
				return 'standard';
			}

			if (width <= 768) {
				return 'wide';
			}

			if (width <= 1440) {
				return 'cinematic';
			}

			return 'cinemascope';
		},
		checkScreenSize() {
			return {
				width: window.innerWidth,
				height: window.innerHeight
			};
		},
		debounce(func: TimerHandler, delay: number | undefined) {
			let timerId: number | undefined;

			return function () {
				clearTimeout(timerId);
				timerId = setTimeout(func, delay);
			};
		},
	}
};
</script>

<template>
    <section class="hero-banner" data-background="light">
        <div class="hero-banner__image" :data-aspect-ratio="aspectRatio" data-animate-into-view="fadeIn">
            <img src="/banner-image.jpg" alt="Group of students socialising at university"/>
        </div>
        <div class="hero-banner__content" data-size="wide" data-animate-into-view="fadeInDown" data-animation-threshold="0.25">
            <div class="hero-banner__content__copy" data-background="secondary">
                <Content/>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/mixins' as *;

.hero-banner {
    position: relative;
    container-name: layout-section;
    container-type: inline-size;

    &:before {
        @include media-breakpoint-up('contained') {
            content: '';
            display: block;
            height: 100%;
            background: url('/banner-image.jpg') center right 100px;
            background-size: contain;
            @include blur-inline-edges();
            position: absolute;
            width: 100cqw;
            top: 0;
            bottom: 0;
            z-index: 0;
            opacity: 0.15;
        }

        @include media-breakpoint-up('wide') {
            background-position: center right;
            background-size: 50%;
            background-repeat: repeat-x;
        }
    }

    @include media-breakpoint-up('contained') {
        height: 50dvh;
    }

    &__image {
        transition: aspect-ratio 0.2s ease-in-out;
        height: 100%;
        animation-delay: 0.6s;

        img {
            display: block;
            max-width: 100%;
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: center center;
            transition: object-position 0.2s ease-in-out, transform 0.2s ease-in-out;
        }

        @include media-breakpoint-up('narrow') {
            @include blur-inline-edges();
            margin-inline-start: auto;

            &[data-aspect-ratio='cinematic'] {
                img {
                    object-position: 200px 90%;
                    transform: scale(1.1);
                }
            }

            &[data-aspect-ratio='cinemascope'] {
                img {
                    object-position: 200px 90%;
                    transform: none;
                }
            }
        }

        @include media-breakpoint-up('wide') {
            margin-inline: auto;
        }
    }

    &__content {
        position: absolute;
        right: calc(-1 * var(--spacing-xxl));
        bottom: 0;
        transform: rotate(2deg);
        display: flex;
        justify-content: flex-end;
        z-index: 20;
        animation-delay: 0.6s;

        @include container-width-up('narrow') {
            left: 0;
            right: unset;
            justify-content: flex-start;
            transform: rotate(-2deg);
        }

        @include container-width-up('contained') {
        }

        &__copy {
            width: fit-content;
            @include curved-shadow();

            :deep(.markdown-body) {
                padding: var(--spacing-lg) var(--spacing-xl);

                h1 {
                    font-size: var(--font-size-xxl);

                    @include media-breakpoint-up('wide') {
                        font-size: var(--font-size-xl);
                    }

                    &:has(em) {
                        line-height: 0.85;
                    }

                    em {
                        font-family: var(--font-family-accent);
                        font-style: normal;
                        display: block;
                        font-size: 2em;

                        @include media-breakpoint-up('wide') {
                            font-size: 2.5em;
                        }
                    }
                }

                h2 {
                    font-weight: var(--font-weight-light);
                    font-size: var(--font-size-md);

                    strong {
                        font-weight: var(--font-weight-bold);
                    }
                }
            }
        }
    }
}
</style>
