<template>
    <div class="fund-line" :class="'fund-line--risk-'+fund.risk">
        <header class="fund-line__header">
            <h3 class="fund-line__title">
                {{fund.name}}
            </h3>
        </header>
        <div class="fund-line__content">
            <ul class="fund-line__list">
                <li class="fund-line__item">
                    <div>Ryzyko:</div>
                    <div>{{fund.risk}}</div>
                </li>
                <li class="fund-line__item">
                    <div>Horyzont:</div>
                    <div>{{fund.horizon}}</div>
                </li>
            </ul>
        </div>
        <footer class="fund-line__footer">
            <label :for="'AddFundTo'+fund.id">Dodaj do: </label>
            <select :id="'AddFundTo'+fund.id" @change="addToWallet">
                <option selected disabled> Wybierz portfel</option>
                <option v-for="wallet in walletsWithoutFund" :value="wallet.id" :key="wallet.id">{{wallet.name}}</option>
            </select>
        </footer>
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
