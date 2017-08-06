<template>
    <div>
        <div  class="section">
            <header class="section__header">
                <h2>Wallets ({{walletsCount}})</h2>
                <custom-button @click="addWallet" type="primary round">+</custom-button>
            </header>
            <div class="loader" v-if="isWalletLoading"></div>
            <ul class="section__list">
                <li v-for="wallet in wallets" :key="wallet.id" class="funds-list__item">
                    <wallet :wallet="wallet" />
                </li>
            </ul>
        </div>

        <section class="section">
            <header class="section__header">
                <h2 class="section__title">Funds</h2>
                <small class="section__count"> {{fundsCount}}</small>
            </header>
            <div class="loader" v-if="isFundsLoading"></div>
            <ul class="section__list">
                <li v-for="fund in funds" :key="fund.id" class="funds-list__item">
                    <fund-line :fund="fund" />
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import FundLine from './FundLine.vue';
import Wallet from './Wallet.vue';
import CustomButton from './Button.vue';

import {
    mapGetters
} from 'vuex'
export default {
    created() {
        this.$store.dispatch('getAllFunds');
    },
    data() {
        return {
            nextWalletId: 0
        }
    },
    methods: {
        addWallet() {
            this.nextWalletId++;
            this.$store.commit('addWallet', {
                id: this.nextWalletId,
                name: this.wallets.length <= 0 ? 'Nowy portfel' : 'Nowy portfel ' + this.wallets.length,
                startDate: new Date(),
                endDate: new Date()
            });
        }
    },
    computed: {
        ...mapGetters(['walletsCount', 'fundsCount', 'wallets', 'funds', 'isFundsLoading', 'isWalletLoading'])
    },
    components: {
        FundLine,
        Wallet,
        CustomButton
    }
}
</script>