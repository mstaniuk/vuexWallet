<template>
    <div>
        <h3>{{fund.name}}</h3>
        <div>{{fund.risk}} : {{fund.horizon}}</div>
        <div>
            {{walletsWithoutFund.length}}
            <label :for="'AddFundTo'+fund.id">Add to: </label>
            <select :id="'AddFundTo'+fund.id">
                <option v-for="wallet in walletsWithoutFund" :key="wallet.id">
                    {{wallet.name}}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        walletsWithoutFund() {
            return this.$store.getters.walletsWithoutFund(this.fund.id)
        },
        ...mapGetters(['wallets'])
    },
    props: ['fund']
}
</script>
