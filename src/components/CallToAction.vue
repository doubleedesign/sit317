<script lang="ts">
export default {};
</script>

<template>
    <section class="call-to-action" data-size="narrow">
        <div class="call-to-action__inner" data-animate-into-view="fadeInUp" data-animation-threshold="0.75">
            <div class="call-to-action__inner__content" data-background="secondary">
                <h2>Level up <strong>this O Week</strong></h2>
                <p>Run a SpeedFriending event and kick-start campus culture in 2027!</p>
                <div class="button-group" role="group" data-halign="center">
                    <a href="#" class="button button-group__button" data-style="outline"><i class="bi bi-youtube"></i>Watch for more</a>
                    <a href="#" class="button button-group__button" data-color-theme="accent">Book a demo<i class="bi bi-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/mixins' as *;
@use '@/functions' as *;

.call-to-action {
    z-index: 10;
    background: linear-gradient(to bottom, var(--color-accent) 0%, var(--color-accent) 50%, var(--color-primary) 50%, var(--color-primary) 100%);
    padding-block-end: var(--spacing-xl);
    margin-block-start: auto;

    &__inner {
        @include curved-shadow();
        animation-delay: 0.3s;

        @include media-breakpoint-up('narrow') {
            gap: var(--spacing-lg);
        }

        &__content {
            transform: rotate(1deg);
            text-align: center;
            padding-block: var(--spacing-xl);
            padding-inline: var(--spacing-lg);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }

        h2 {
            text-transform: uppercase;
            line-height: 1;
            margin: 0;
            margin-bottom: -1rem;

            strong {
                font-family: var(--font-family-accent);
                font-size: 2.25em;
                display: block;
            }
        }

        p {
            margin: 0;
            font-size: var(--font-size-md);
        }

        .button {
            &[data-color-theme="accent"] {
                border-color: black;

                &:hover, &:focus, &:active {
                    color: var(--color-accent);
                    background: black;
                }
            }
        }
    }
}
</style>
