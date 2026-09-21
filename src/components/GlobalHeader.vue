<script lang="ts">
export default {
	data() {
		return {
			breakpoint: '600px',
			isBelowBreakpoint: true,
			responsiveMenuOpen: false,
		};
	},
	mounted() {
		// Check screen size first; or if breakpoint is 0, we're always in responsive mode
		if (['0', '0px', '0rem'].includes(this.breakpoint)) {
			this.isBelowBreakpoint = true;
		}
		else {
			this.checkScreenSize();
		}

		// If we're in "desktop" mode, we want the menu visible
		this.responsiveMenuOpen = !this.isBelowBreakpoint;

		// Listen for resize events and re-check screen size (if breakpoint is not 0)
		if (!['0', '0px', '0rem'].includes(this.breakpoint)) {
			window.addEventListener('resize', this.debounce(this.checkScreenSize, 200));
		}
	},
	methods: {
		toggleMenu() {
			this.responsiveMenuOpen = !this.responsiveMenuOpen;
		},
		async checkScreenSize() {
			this.isBelowBreakpoint = window.matchMedia(`(max-width: ${this.breakpoint})`).matches;
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
    <header class="global-header" data-background="primary" data-size="contained">
        <button @click="toggleMenu"
                class="global-header__menu-toggle"
                v-if="isBelowBreakpoint"
                aria-label="Toggle menu"
                title="Toggle menu"
                aria-haspopup="true"
                :aria-expanded="responsiveMenuOpen"
        >
            <svg v-if="responsiveMenuOpen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
        </button>
        <div class="global-header__logo">
            <img src="/logo.png" alt="UniNexus"/>
        </div>
        <div v-if="isBelowBreakpoint"
             class="global-header__menu--overlay"
             :data-open="responsiveMenuOpen"
        >
            <Transition>
                <nav class="global-header__menu" v-if="responsiveMenuOpen" data-background="primary">
                    <ul>
                        <li><a href="#">For students</a></li>
                        <li><a href="#" aria-current="page">For unions</a></li>
                        <li><a href="#">For businesses</a></li>
                        <li><a href="#">Contact us</a></li>
                    </ul>
                </nav>
            </Transition>
        </div>
        <nav v-else class="global-header__menu">
            <ul>
                <li><a href="#">For students</a></li>
                <li><a href="#" aria-current="page">For unions</a></li>
                <li><a href="#">For businesses</a></li>
                <li><a href="#">Contact us</a></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped lang="scss">
@use '@/mixins' as *;
@use '@/functions' as *;

.global-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.25);
    z-index: 300;

    @include media-breakpoint-up('small') {
        flex-direction: row;
        justify-content: space-between;
    }

    &__menu {
        padding-block: var(--spacing-md);

        @include container-width-up('small') {
            width: auto;
        }

        &-toggle {
            color: var(--color-secondary);
            cursor: pointer;
            position: absolute;
            top: var(--spacing-xl);
            left: 0;
            z-index: 200;
            background: 0;
            border: 0;
            appearance: none;
            width: 24px;
            height: 24px;

            svg {
                width: 24px;
                height: 24px;
            }

            &[aria-expanded="true"] {
                color: contrast-color(var(--color-primary));
            }
        }

        ul {
            display: flex;
            justify-content: flex-end;
            gap: var(--spacing-lg);
            list-style: none;
            padding: 0;
            margin: 0;
            --theme-color: var(--color-secondary);

            li {
                font-weight: var(--font-weight-bold);
                margin: 0;
                text-transform: uppercase;
                font-size: 1.1rem;

                a {
                    @include link-underline-on-hover();
                    text-decoration-color: transparent;

                    &[aria-current="page"] {
                        @include active-link();
                        color: var(--color-secondary);
                    }
                }
            }
        }

        &--overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -100;
            pointer-events: none;

            &[data-open="true"] {
                z-index: 100;
                pointer-events: unset;
            }

            .v-enter-active,
            .v-leave-active {
                transition: opacity 0.3s ease;
            }

            .v-enter-from,
            .v-leave-to {
                opacity: 0;
            }

            .global-header__menu {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                justify-content: center;
                align-items: center;

                ul {
                    display: flex;
                    flex-direction: column;
                    text-align: center;

                    li {
                        font-size: var(--font-size-lg);
                    }
                }
            }
        }
    }

    &__logo {
        padding-inline: 1rem; // using precise numbers here so the calcs for the triangle size work neatly
        background: var(--color-light);
        position: relative;
        width: fit-content;
        filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.25));

        &:after {
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: var(--spacing-xl) 4rem 0 4rem;
            bottom: calc(-1 * var(--spacing-xl));
            border-color: var(--color-light) transparent transparent transparent;
            transform: rotate(0deg);
            position: absolute;
            left: 0;
            right: 0;
        }

        img {
            width: 6rem; // using precise value here so the calcs for the triangle size work neatly
            display: block;
            padding-block-start: var(--spacing-md);
            padding-block-end: 0.25rem;
        }
    }
}
</style>
