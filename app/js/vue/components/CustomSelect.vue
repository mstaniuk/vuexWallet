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
        window.addEventListener('resize', debounce(this.getWidgetBounds, 100));

        this.getWidgetBounds();
        this.setPositionFromValue(this.innerValue);
    },
    beforeDestroy: function () {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    },
    methods: {
        getWidgetBounds() {
            this.widgetBounds = this.$refs.widget.getBoundingClientRect();
            this.setPositionFromValue(this.innerValue);
        },
        onMouseDown(e) {
            e.preventDefault();
            this.isActive = !this.disabled;

            if(this.isActive) {
                this.lastPosition = e.clientX;
                this.setPosition(e.offsetX);
            }
        },
        onTouchStart(e) {
            e.preventDefault();
            this.isActive = !this.disabled;

            if(this.isActive) {
                this.lastPosition = e.targetTouches[0].clientX;
                this.setPosition(e.targetTouches[0].pageX - this.widgetBounds.left);
            }
        },
        onMouseMove(e) {
            e.stopPropagation();

            if (this.isActive && !this.disabled) {
                var clientX = typeof e.targetTouches !== 'undefined' ? e.targetTouches[0].clientX : e.clientX;
                this.setPosition(this.position + clientX - this.lastPosition);

                this.lastPosition = Math.max(
                    this.widgetBounds.left,
                    Math.min(
                        clientX,
                        this.widgetBounds.left + this.widgetBounds.width
                    )
                );
            }
        },
        onMouseUp(e) {
            e.preventDefault();
            e.stopPropagation();

            if (this.isActive && !this.disabled) {
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
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            default: 0
        }
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

<style scoped>
.custom-range {
    position: relative;
    display: block;
    width: 300px;
    margin: 5px 15px;
    padding: 10px 0;
}

.custom-range:hover {
    cursor: pointer;
}

.custom-range.isActive .custom-range__handle {
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.1);
}

.custom-range.isActive .custom-range__handle:before {
    transform: scale(1);
}

.custom-range.isDisabled:hover {
    cursor: default;
}

.custom-range.isDisabled .custom-range__handle {
    background-color: #f1f1f1;
}

.custom-range.isDisabled .custom-range__bar-inner {
    background-color: #aaa;
}

.custom-range__bar {
    position: relative;
    width: 100%;
    height: 5px;
    border: 1px solid #f1f1f1;
    background-color: transparent;
}

.custom-range__bar-inner {
    position: absolute;
    top: 0;
    left: 0;
    will-change: width;
    height: 100%;
    width: 0%;
    background-color: #F44336;
}

.custom-range__handle {
    transition: box-shadow 250ms;
    position: absolute;
    top: 50%;
    left: 0;
    will-change: left, box-shadow;
    border: 1px solid #ddd;
    background-color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 1px 0 transparent;
    pointer-events: none;
}

.custom-range__handle:before {
    transition: transform 150ms ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    content: '';
    border-radius: 50%;
    transform: scale(0);
}
</style>
