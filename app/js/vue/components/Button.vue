<template>
    <button @click="handleClick" :class="[cls, {animate: isAnimating} ]">
        <slot></slot>
    </button>
</template>

<script>
export default {
    mounted() {
        console.log(this);
    },
    data() {
        return {
            isAnimating: false
        }
    },
    computed: {
        cls() {
            let baseClass = 'button';

            if(typeof this.type !== 'undefined') {
                baseClass += ' '+this.type.split(' ').map((el) => 'button--'+el).join(' ');
            }

            return baseClass
        }
    },
    methods: {
        animate() {
            this.isAnimating = true;
            setTimeout(() => this.isAnimating = false, 500);
        },
        handleClick() {
            this.animate();
            this.$emit('click');
        }
    },
    props: ['type']
}
</script>
