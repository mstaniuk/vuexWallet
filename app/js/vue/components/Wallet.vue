<template>
    <div>
        <div>
            <h3>{{ wallet.name }}</h3>
        </div>
        <div>
            <div>
                <small>{{ wallet.startDate }}</small>
            </div>
            <div>
                <small>{{ wallet.endDate }}</small>
            </div>
            <div>
                <small>{{ wallet.investValue }}</small>
            </div>
            <div>
                <small>{{ wallet.displayType }}</small>
            </div>
        </div>
    
        <h3>Funds {{funds.length}}</h3>
        <ul>
            <li v-for="fund in funds" :key="fund.id">
                <fund :fund="fund" :walletId="wallet.id" />
            </li>
        </ul>
    
        <button @click="dummy(wallet.id)">Change Name</button>
        <custom-select :value="wallet.investValue" @input="setInvestValue" :min="500" :max="100000000" />
    </div>
</template>

<script>
import Fund from './Fund.vue';
import CustomSelect from './CustomSelect.vue';

export default {
    data() {
        return {
            invest: 500
        }
    },
    computed: {
        funds() {
            return this.$store.getters.fundsFromWallet(this.wallet.id);
        }
    },
    methods: {
        setInvestValue(value) {
            this.$store.commit('setWaletInvestVaue', { walletId: this.wallet.id, value });
        },
        dummy(id) {
            this.$store.commit('addFundToWallet', {
                walletId: this.wallet.id, fund:
                {
                    id: '002',
                    name: "Test fund",
                    startValue: 234,
                    endValue: 345,
                    risk: 2,
                    horizon: 2,
                    isLocked: false,
                    percentage: (100 / (this.wallet.funds.length + 1))
                }
            })
        }
    },
    components: {
        Fund,
        CustomSelect
    },
    props: ['wallet']
}
</script>

