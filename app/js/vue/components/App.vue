<template>
    <div class="app">
        <aside class="app__aside funds-list">
            <header class="funds-list__header">
                <h2 class="funds-list__title">Funds <small class="funds-list__amount">({{fundsCount}})</small></h2>
                
            </header>
            <div class="funds-list__content">
                <div class="loader" v-if="isFundsLoading"></div>
                <ul class="funds-list__list" v-else>
                    <li v-for="fund in funds" :key="fund.id" class="funds-list__item">
                        <fund-line :fund="fund" />
                    </li>
                    <li v-for="fund in funds" :key="fund.id" class="funds-list__item">
                        <fund-line :fund="fund" />
                    </li>
                    <li v-for="fund in funds" :key="fund.id" class="funds-list__item">
                        <fund-line :fund="fund" />
                    </li>
                    <li v-for="fund in funds" :key="fund.id" class="funds-list__item">
                        <fund-line :fund="fund" />
                    </li>
                </ul>
            </div>
        </aside>
        <section class="app__wallets">
            <header>
                <h2>Wallets ({{walletsCount}})</h2> <custom-button @click="addWallet" type="primary round">+</custom-button>
            </header>
            <div class="loader" v-if="isWalletLoading"></div>
            <ul>
                <li v-for="wallet in wallets" :key="wallet.id" class="funds-list__item">
                    <wallet :wallet="wallet" />
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
                name: this.wallets.length <= 0 ? 'Wallet' : 'Wallet #' + this.wallets.length,
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