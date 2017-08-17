<template>
    <div class="custom-range" ref="widget" :class="{isActive: isActive, isDisabled: disabled}" @mousedown="onMouseDown" @touchstart="onTouchStart">
        <div class="custom-range__bar">
            <div class="custom-range__bar-inner" :style="{width: position+'px'}">
            </div>
        </div>
        <div class="custom-range__handle" :style="{left: position+'px'}">
        </div>
    </div>
</template>

<script>
import { debounce } from '../../misc.js';

export default {
    mounted: function () {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('touchend', this.onMouseUp);
        window.addEventListener('resize', this.getWidgetBounds);

        this.getWidgetBounds();
        this.setPositionFromValue(this.innerValue);
    },
    beforeDestroy: function () {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('touchmove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('touchend', this.onMouseUp);
        window.removeEventListener('resize', this.getWidgetBounds);
    },
    computed: {
        hasReachedMaxValue() {
            return this.maxValue !== null && this.maxValue <= this.innerValue;
        }
    },
    methods: {
        getWidgetBounds() {
            this.widgetBounds = this.$refs.widget.getBoundingClientRect();
            this.setPositionFromValue(this.innerValue);
        },
        onMouseDown(e) {
            this.isActive = !this.disabled;

            if(this.isActive) {
                e.preventDefault();
                this.lastPosition = e.clientX;
                this.setPosition(e.offsetX);
            }
        },
        onTouchStart(e) {
            this.isActive = !this.disabled;

            if(this.isActive) {
                e.preventDefault();
                this.lastPosition = e.targetTouches[0].clientX;
                this.setPosition(e.targetTouches[0].pageX - this.widgetBounds.left);
            }
        },
        onMouseMove(e) {
            if (this.isActive && !this.disabled) {
                e.stopPropagation();
                const clientX = typeof e.targetTouches !== 'undefined' ? e.targetTouches[0].clientX : e.clientX;
                this.setPosition(this.position + clientX - this.lastPosition);

                if(this.hasReachedMaxValue) {
                    this.lastPosition = this.widgetBounds.left + this.position;
                } else {
                    this.lastPosition = Math.max(
                        this.widgetBounds.left,
                        Math.min(
                            clientX,
                            this.widgetBounds.left + this.widgetBounds.width
                        )
                    );
                }

                
            }
        },
        onMouseUp(e) {
            if (this.isActive && !this.disabled) {
                e.preventDefault();
                e.stopPropagation();
                this.lastPosition = null;
                this.isActive = false;
            }
        },
        setPosition(pos) {
            this.position = Math.max(0, Math.min(pos, this.widgetBounds.width));
            this.setValueFromPosition(pos);
        },
        setValueFromPosition() {
            const value = (this.position / this.widgetBounds.width) * (this.max - this.min) + this.min;

            if (value < this.min) {
                this.setPosition(0);
            } else if (value > this.max) {
                this.setPosition(this.widgetBounds.width);
            } else if(this.maxValue !== null && this.maxValue < value) {
                this.setPositionFromValue(this.maxValue);
                this.innerValue = this.maxValue;
                this.$emit('input', this.innerValue);
            } else {
                let newValue = Math.ceil(value / this.step) * this.step;

                if (newValue !== this.innerValue) {
                    this.innerValue = newValue;
                    this.$emit('input', this.innerValue);
                }
            }
        },
        setPositionFromValue(val) {
            const pos = ((val - this.min)) / (this.max - this.min) * this.widgetBounds.width;
            this.position = Math.max(0, Math.min(pos, this.widgetBounds.width));
        }
    },
    watch: {
        value(newValue, oldValue) {
            if (this.innerValue !== this.value && newValue !== oldValue) {
                this.setPositionFromValue(this.value);
                this.innerValue = this.value;
            }
        }
    },
    props: {
        min: {type: Number, default: 0},
        max: {type: Number, default: 100},
        maxValue: {type: Number, default: null},
        step: {type: Number, default: 1},
        disabled: {type: Boolean, default: false},
        value: {type: Number, default: 0}
    },
    data() {
        return {
            isActive: false,
            innerValue: this.value,
            position: 0,
            widgetBounds: {},
            lastPosition: null
        };
    }
}
</script>
