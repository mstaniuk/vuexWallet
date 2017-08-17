<template>
    <div>
        <div>
            <h4>{{fund.name}}</h4>
        </div>
        <div>
            <div>
                <small>{{fund.startValue}}</small>
            </div>
            <div>
                <small>{{fund.endValue}}</small>
            </div>
            <div>
                <small>{{fund.risk}}</small>
            </div>
            <div>
                <small>{{fund.horizon}}</small>
            </div>
            <div>
                <small>{{fund.isLocked}}</small>
            </div>
            <div>
                <small>{{fund.percentage}}</small>
            </div>
            <div>
                <small>{{maxValue}}</small>
            </div>
        </div>
        <custom-range v-model="percentage" :disabled="isSingle || fund.isLocked" :min="0" :max="100" :maxValue="maxValue" />
        <custom-button @click="remove" type="primary round">&times;</custom-button>
        <custom-button @click="toggleLock" type="primary round" :disabled="isLessThanThreeActive">
            <span v-if="fund.isLocked">	&#128274;</span>
            <span v-else>&#128275;</span>
        </custom-button>
    </div>
</template>

<script>
import CustomRange from './CustomRange.vue';
import CustomButton from './Button.vue';

export default {
    methods: {
        toggleLock(isLocked) {
            this.$store.commit('setFundPercentage', { walletId: this.walletId, fundId: this.fund.id, value: val });
        },
        remove() {
            this.$store.dispatch('removeFundFromWallet', { walletId: this.walletId, fundId: this.fund.id })
        },
        toggleLock() {
            // Todo: dispatch something ¯\_(ツ)_/¯
            // this.$store.dispatch()

            // Temp:
            this.fund.isLocked = !this.fund.isLocked;
        }
    },
    computed: {
        wallet() {
            return this.$store.getters.fundsWallet(this.walletId);
        },
        isSingle() {
            return this.wallet.funds.length < 2;
        },
        isLessThanThreeActive() {
            return !this.fund.isLocked && (this.wallet.funds.filter(f => f.isLocked === false).length < 3);
        },
        percentage: {
            get() {
                return this.fund.percentage;
            },
            set(value) {
                this.$store.commit('setFundPercentage', { walletId: this.walletId, fundId: this.fund.id, value });
            }
        },
        maxValue() {
            return this.$store.getters.maxActiveFundValue(this.walletId, this.fund.id, 100);
        }
    },
    props: ['fund', 'walletId'],
    components: {
        CustomRange,
        CustomButton
    }
}
</script>
