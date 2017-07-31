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
        <custom-select :value="fund.percentage" @input="changePercentage" :min="0" :max="100" />
        <button @click="remove">X</button>
    </div>
</template>

<script>
import CustomSelect from './CustomSelect.vue';

export default {
    methods: {
        toggleLock(isLocked) {
            this.$store.commit('setFundPercentage', { walletId: this.walletId, fundId: this.fund.id, value: val });
        },
        changePercentage(val) {
            this.$store.commit('setFundPercentage', { walletId: this.walletId, fundId: this.fund.id, value: val });
        },
        remove() {
            this.$store.commit('removeFundFromWallet', { walletId: this.walletId, fundId: this.fund.id })
        }
    },
    props: ['fund', 'walletId'],
    components: {
        CustomSelect
    }
}
</script>
