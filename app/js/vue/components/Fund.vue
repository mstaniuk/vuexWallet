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
        </div>
        <custom-range v-model="percentage" :disabled="isSingle || fund.isLocked" :min="0" :max="100" />
        <button @click="remove">X</button>
        <button @click="toggleLock">
            <span v-if="fund.isLocked">Unlock</span>
            <span v-else>Lock</span>
        </button>
    </div>
</template>

<script>
import CustomRange from './CustomRange.vue';

export default {
    methods: {
        toggleLock(isLocked) {
            this.$store.commit('setFundPercentage', { walletId: this.walletId, fundId: this.fund.id, value: val });
        },
        changePercentage(val) {
            
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
        percentage: {
            get() {
                return this.fund.percentage;
            },
            set(value) {
                this.$store.commit('setFundPercentage', { walletId: this.walletId, fundId: this.fund.id, value });
            }
        }
    },
    props: ['fund', 'walletId'],
    components: {
        CustomRange
    }
}
</script>
