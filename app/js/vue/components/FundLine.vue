<template>
    <div>
        <h3>{{fund.name}}</h3>
        <div>{{fund.risk}} : {{fund.horizon}}</div>
        <div>
            {{walletsWithoutFund.length}}
            <label :for="'AddFundTo'+fund.id">Add to: </label>
            <select :id="'AddFundTo'+fund.id" @change="addToWallet">
                <option selected disabled> Wybierz portfel </option>
                <option v-for="wallet in walletsWithoutFund" :value="wallet.id" :key="wallet.id">
                    {{wallet.name}}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    methods: {
        addToWallet(event) {
            const target = event.target;
            const walletId = parseInt(target.options[target.selectedIndex].value);
            event.target.selectedIndex = 0;

            this.$store.dispatch('addFundToWallet', {
                walletId,
                fundId: this.fund.id
            })
        }
    },
    computed: {
        walletsWithoutFund() {
            return this.$store.getters.walletsWithoutFund(this.fund.id)
        },
        ...mapGetters(['wallets'])
    },
    props: ['fund']
}
</script>
