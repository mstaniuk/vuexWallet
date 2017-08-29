<template>
    <div class="fund-line" :class="'fund-line--risk-'+fund.risk" @click="onClickHandler">
        <div class="fund-line__content">
            <div class="fund-line__front">
                <header class="fund-line__header">
                    <h3 class="fund-line__title">
                        {{fund.name}}
                    </h3>
                </header>
                <div class="fund-line__info">
                    <div class="fund-line__info-item">Risk: {{fund.risk}}</div>
                    <div class="fund-line__info-item">Horizon: {{fund.horizon}}</div>
                </div>
            </div>
            <div class="fund-line__back">
                <div class="fund-line__back-inner" v-if="walletsWithoutFund.length <= 0">
                    <div class="fund-line__label">Exist in all wallets.</div>
                </div>
                <div class="fund-line__back-inner" v-else-if="walletsWithoutFund.length === 1">
                    <div class="fund-line__label">Add to <br>{{wallets[0].name}}</div>
                </div>
                <div class="fund-line__back-inner" v-else>
                    <label class="fund-line__label" :for="'AddFundTo'+fund.id">Add to </label>
                    <select :id="'AddFundTo'+fund.id" @change="addToWallet">
                        <option selected disabled>Choose wallet</option>
                        <option v-for="wallet in walletsWithoutFund" :value="wallet.id" :key="wallet.id">{{wallet.name}}</option>
                    </select>
                </div>
            </div>
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
        },
        onClickHandler() {
            if(this.walletsWithoutFund.length === 1) {

                this.$store.dispatch('addFundToWallet', {
                    walletId: this.walletsWithoutFund[0].id,
                    fundId: this.fund.id
                })
            }
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
