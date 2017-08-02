<template>
    <div>
        <div>
            <h3 v-if="!isEditing">
                {{ wallet.name }}
                <button @click="toggleEdit">Edit</button>
            </h3>
            <div v-else>
                <input v-model.lazy.trim="newName">
                <button @click="saveEdit">save</button>
                <button @click="discardEdit">cancel</button>
            </div>
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
    
        <custom-select :value="wallet.investValue" @input="setInvestValue" :min="500" :max="100000000" />
    </div>
</template>

<script>
import Fund from './Fund.vue';
import CustomSelect from './CustomSelect.vue';

export default {
    data() {
        return {
            invest: 500,
            isEditing: false,
            newName: this.wallet.name
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
        toggleEdit() {
            this.isEditing = !this.isEditing;
        },
        saveEdit() {
            // Todo commit name change
            this.wallet.name = this.newName;
            this.toggleEdit();
        },
        discardEdit() {
            // Todo commit name change
            this.newName = this.wallet.name;
            this.toggleEdit();
        }
    },
    components: {
        Fund,
        CustomSelect
    },
    props: ['wallet']
}
</script>

