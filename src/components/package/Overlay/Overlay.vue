<script lang='ts' setup>
import { toRefs } from 'vue';

const props = defineProps({
    borderColor : {
        type: String,
        default: '#ff8201',
    },
    circleColor : {
        type: String,
        default: '#ff8201',
    },
    show : {
        type: Boolean,
        required: true
    }
})

const {
    borderColor,
    circleColor,
    show
 } = toRefs(props);
</script>
<template>
    <b-overlay :show="show" rounded="sm">
    </b-overlay>
</template>

<style lang="scss">
// rotation

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

    div.b-overlay {
        & div:nth-child(2) {
            left: calc(50% - 33.5px) !important;
            border: 5px solid v-bind('borderColor');
            border-radius: 50%;
            border-bottom: 5px solid transparent;
            transform-origin: 50% 50%;
            -webkit-transform-origin: 50% 50%;
            animation: 0.75s ease-out infinite rotate;
            -webkit-animation: 0.75s ease-out infinite rotate;
            & span {
                border: none;
                border-radius: 50%;
                margin: 7px;
                background-color: v-bind('circleColor');
                width: 43px;
                height: 43px;
                animation: none;
                -webkit-animation: none;
            }
        }
    }
</style>