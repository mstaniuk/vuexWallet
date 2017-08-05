<template>
    <div>
        <div>
            <button @click="remove">X</button>
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
    
        <custom-range v-model="rangeInvestValue" :min="1" :max="investValueRangeMax" />
    </div>
</template>

<script>
import Fund from './Fund.vue';
import CustomRange from './CustomRange.vue';
import defaults from '../../defaults.js';

export default {
    data() {
        return {
            isEditing: false,
            newName: this.wallet.name
        }
    },
    computed: {
        funds() {
            return this.$store.getters.fundsFromWallet(this.wallet.id);
        },
        rangeInvestValue: {
            set: function (val) {
                const sVal = '' + val;
                let first = parseInt((sVal).charAt(0));
                let second = parseInt((sVal).charAt(1)) || 0;

                if (sVal.length === 1) {
                    second = first;
                    first = 0;
                } else if (second === 0) {
                    return;
                }

                const investValue = (second) * Math.pow(10, first) * defaults.minimalInvestValue;
                this.$store.commit('setWaletInvestVaue', {walletId: this.wallet.id, value: investValue});
            },
            get: function () {
                const sVal = '' + this.wallet.investValue;
                const first = parseInt((sVal).charAt(0));
                const valLen = sVal.length;
                return parseInt('' + (valLen - 3) + (first));
            }
        },
        investValueRangeMax() {
            let investDiff = defaults.maximalInvestValue;

            if(defaults.minimalInvestValue > 0) {
                investDiff = defaults.maximalInvestValue / defaults.minimalInvestValue;
            }
            
            return (Math.ceil(Math.log(investDiff + 1) / Math.LN10) - 1) * 10 + 1;
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
        },
        remove() {
            this.$store.commit('removeWallet', {id: this.wallet.id});
        }
    },
    components: {
        Fund,
        CustomRange
    },
    props: ['wallet']
}
</script>
