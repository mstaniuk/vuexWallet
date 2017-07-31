<template>
    <div class="wallet">
        <button @click="getData">Get Data</button>
        <div>
            <h2>Wallets ({{walletsCount}})</h2>
            <ul>
                <li v-for="wallet in wallets" :key="wallet.id">
                    <wallet :wallet="wallet" />
                </li>
            </ul>
        </div>
        <div>
            <h2>Funds ({{fundsCount}}) </h2>
            <ul>
                <li v-for="fund in funds" :key="fund.id">
                    <fund-line :fund="fund" />
                </li>
    
            </ul>
        </div>
        <button @click="addDummy">Add wallet</button>
    </div>
</template>

<script>
import axios from 'axios';
import CustomSelect from './CustomSelect.vue';
import FundLine from './FundLine.vue';
import Wallet from './Wallet.vue';

import {
    mapGetters
} from 'vuex'
export default {
    created() {
        // dispatch Ajax call
    },
    data() {
        return {
            nextWalletId: 0
        }
    },
    methods: {
        getData() {
            this.$store.commit('fillData');
        },
        addDummy() {
            this.nextWalletId++;
            this.$store.commit('addWallet', {
                id: this.nextWalletId,
                name: 'Test Wallet',
                startDate: new Date(),
                endDate: new Date()
            });
        }
    },
    computed: {
        ...mapGetters(['walletsCount', 'fundsCount', 'wallets', 'funds'])
    },
    components: {
        CustomSelect,
        FundLine,
        Wallet
    }
}
</script>