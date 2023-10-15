<script  lang="ts" setup>
import Toast from 'primevue/toast';
</script>
<template>
    <toast>
        <template #message="slotProps">
            <div class="flex toast-inner flex-column align-items-center" style="flex: 1">
                <div class="text-center">
                    <h1 class="font-bold text-4xl ">{{ slotProps.message.summary }}</h1>
                    <p class="my-1">{{ slotProps.message.detail }}</p>
                </div>
            </div>
        </template>
    </toast>
</template>


<style lang="scss">
.p-toast {
    top: 50px !important;

    & .p-toast-message {
        border-radius: 15px;
        position: relative;
        border: none !important;

        &::before {
            position: absolute;
            top: -25px;
            left: 30px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;
        }

        &::after {
            position: absolute;
            top: -38px;
            left: 30px;
            width: 69px;
            height: 69px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            fill: #fff;
            z-index: 1;
        }

        & .p-toast-message-content {
            padding: 0 !important;

            & .toast-inner {
                overflow: hidden;
                padding: 1rem;
                color: #fff;

                &::after {
                    position: absolute;
                    bottom: -25px;
                    left: -35px;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        & .p-toast-icon-close {
            color: #fff !important;
            position: absolute;
            top: 10px;
            right: 15px;
        }

        &.p-toast-message-error {
            background-color: var(--color-danger) !important;

            &::before {
                content: url("https://static.exploremelon.com/dashkit/msg-error.svg");
            }

            &::after {
                content: url("https://static.exploremelon.com/dashkit/close.svg");
            }

        }

        & h1,
        p {
            color: #fff;
            text-align: center;
        }

        &.p-toast-message-success {
            background-color: var(--color-success) !important;

            &::before {
                content: url("https://static.exploremelon.com/dashkit/msg-success.svg");
            }

            &::after {
                content: url("https://static.exploremelon.com/dashkit/check.svg");
            }

            & .toast-inner::after {
                content: url("https://static.exploremelon.com/dashkit/logo-success.svg");
            }
        }
    }
}
</style>