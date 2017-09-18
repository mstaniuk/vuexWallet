<template>
    <section class="fund">
        <header class="fund__header">
            <custom-button @click="remove" type="primary round">&times;</custom-button>
            <h4 class="fund__title">{{fund.name}}</h4>
        </header>
        <ul class="fund__props">
            <li class="fund__prop">
                Risk: {{fund.risk}}
            </li>
            
            <li class="fund__prop">
                Horizon: {{fund.horizon}}
            </li>

            <li class="fund__prop" v-if="wallet.displayType === WALLET_DISPLAY_TYPE_PERCENTAGE">
                ROI: {{returnPercentage}}
            </li>
            <li class="fund__prop" v-if="wallet.displayType === WALLET_DISPLAY_TYPE_PLN">
                Return value: {{returnValue}}
            </li>

            <li class="fund__prop fund__prop--actions">
                <custom-range
                    v-model="percentage"
                    :disabled="isInputDisabled"
                    :min="0" :max="100"
                    :maxValue="maxPercentageValue" />

                <input
                    v-if="wallet.displayType === WALLET_DISPLAY_TYPE_PLN"
                    v-model.lazy="worth"
                    :disabled="isInputDisabled"
                    :max="maxWorthValue" 
                    type="number"/>

                <input
                    v-if="wallet.displayType === WALLET_DISPLAY_TYPE_PERCENTAGE"
                    v-model.lazy="percentage"
                    :disabled="isInputDisabled"
                    :max="maxPercentageValue" 
                    type="number"/>

                <custom-button @click="toggleLock" type="primary round" :disabled="isLessThanThreeActive">
                    <span v-if="fund.isLocked">	&#128274;</span>
                    <span v-else>&#128275;</span>
                </custom-button>
            </li>
        </ul>
    </section>
</template>

<script>
import CustomRange from './CustomRange.vue';
import CustomButton from './Button.vue';
import {WALLET_DISPLAY_TYPE_PLN, WALLET_DISPLAY_TYPE_PERCENTAGE} from '../../consts.js';

export default {
    data() {
        return {
            WALLET_DISPLAY_TYPE_PLN,
            WALLET_DISPLAY_TYPE_PERCENTAGE
        };
    },
    methods: {
        toggleLock(isLocked) {
            this.$store.commit('setFundPercentage', { walletId: this.walletId, fundId: this.fund.id, value: val });
        },
        remove() {
            this.$store.dispatch('removeFundFromWallet', { walletId: this.walletId, fundId: this.fund.id })
        },
        toggleLock() {
            this.$store.commit('setFundLocked', { walletId: this.walletId, fundId: this.fund.id, value: !this.fund.isLocked });
        }
    },
    computed: {
        wallet() {
            return this.$store.getters.fundsWallet(this.walletId);
        },
        isInputDisabled() {
            return this.isSingle || this.fund.isLocked;
        },
        isSingle() {
            return this.wallet.funds.length < 2;
        },
        isLessThanThreeActive() {
            return !this.fund.isLocked && (this.wallet.funds.filter(f => f.isLocked === false).length < 3);
        },
        returnPercentage() {
            return parseInt(((this.fund.endValue - this.fund.startValue) / this.fund.startValue)*100)/100;
        },
        returnValue() {
            return this.returnPercentage * this.wallet.investValue * this.percentage;
        },
        percentage: {
            get() {
                return this.fund.percentage;
            },
            set(value) {
                this.$store.commit('setFundPercentage', { walletId: this.walletId, fundId: this.fund.id, value });
            }
        },
        worth: {
            get() {
                return this.fund.percentage/100 * this.wallet.investValue;
            },
            set(value) {
                const percentage = (value / this.wallet.investValue)*100
                this.$store.commit('setFundPercentage', { walletId: this.walletId, fundId: this.fund.id, value: percentage });
            }
        },
        maxPercentageValue() {
            return this.$store.getters.maxActiveFundValue(this.walletId, this.fund.id, 100);
        },
        maxWorthValue() {
            return this.maxPercentageValue/ 100 * this.wallet.investValue;
        }
    },
    props: ['fund', 'walletId'],
    components: {
        CustomRange,
        CustomButton
    }
}
</script>
