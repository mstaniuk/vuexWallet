<template>
    <div class="wallet">
        <button @click="getData">Get Data</button>
        <div>
             <h2>Wallets ({{walletsCount}})</h2> 
             <div v-for="wallet in wallets" :key="wallet.id"> 
                 <div>
                    {{ wallet.id }} {{ wallet.name }}
                </div>
                <div>
                    <small>{{ wallet.startDate }}</small>
                </div>
                <button @click="removeDummy(wallet.id)">Remve wallet</button>
             </div> 
        </div>
        <div>
             <!-- <h2>Funds ({{fundsCount}}) </h2>  -->
            <div v-for="fund in funds" :key="fund.id">
                <h3>{{fund.name}}</h3>
                <div>{{fund.risk}} : {{fund.horizon}}</div>
                <div>
                    <label :for="'AddFundTo'+fund.id">Add to: </label>
                     <select :id="'AddFundTo'+fund.id"> 
                        <option v-for="wallet in wallets" :key="wallet.id">
                            {{wallet.name}}
                        </option>
                    </select>
                </div>

            </div> 
        </div>
        <button @click="addDummy">Add wallet</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import CustomSelect from './CustomSelect.vue';
    import {
        mapGetters
    } from 'vuex'
    export default {
        created() {
            // Ajax call
        },
        methods: {
            getData() {
                this.$store.commit('fillData');
            },
            addDummy() {
                this.$store.commit('addWallet', {
                    name: 'Test Wallet',
                    startDate: new Date(),
                    endDate: new Date()
                })
            },
            removeDummy(id) {
                this.$store.commit('removeWallet', { id })
            }
        },
        computed: {
            ...mapGetters(['walletsCount', 'fundsCount', 'wallets', 'funds'])
        },
        components: {
            CustomSelect
        }
    }
</script>