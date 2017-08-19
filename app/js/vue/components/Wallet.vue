<template>
    <div>
        <div>
            <h3 v-if="!isEditing">
                {{ wallet.name }}
            </h3>
            <div v-else>
                <input v-model.lazy.trim="newName">
                <custom-button @click="saveEdit" type="success">save</custom-button>
                <custom-button @click="discardEdit" type="primary">cancel</custom-button>
            </div>
            <custom-button @click="remove" type="primary round">&times;</custom-button>
            <custom-button  v-if="!isEditing" @click="toggleEdit" type="primary round">&#9999;</custom-button>
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
        <div>
            <span>Display type</span>
            <div>
                <label :for="'dispType'+wallet.id+'pln'">
                    <input type="radio" :name="'dispType'+wallet.id" :id="'dispType'+wallet.id+'pln'" :value="WALLET_DISPLAY_TYPE_PLN" v-model="displayType"/>
                    <span>PLN</span>
                </label>
            </div>
            <div>
                <label :for="'dispType'+wallet.id+'percentage'">
                    <input type="radio" :name="'dispType'+wallet.id" :id="'dispType'+wallet.id+'percentage'" :value="WALLET_DISPLAY_TYPE_PERCENTAGE" v-model="displayType"/>
                    <span>Percentage</span>
                </label>
            </div>
        </div>
        <input type="number" @change="v => setInvestValue(v.target.value)" :value="wallet.investValue"/>
    </div>
</template>

<script>
import Fund from './Fund.vue';
import CustomRange from './CustomRange.vue';
import CustomButton from './Button.vue';
import defaults from '../../defaults.js';
import {WALLET_DISPLAY_TYPE_PLN, WALLET_DISPLAY_TYPE_PERCENTAGE} from '../../consts.js';

export default {
    data() {
        return {
            isEditing: false,
            newName: this.wallet.name,
            WALLET_DISPLAY_TYPE_PLN,
            WALLET_DISPLAY_TYPE_PERCENTAGE
        }
    },
    computed: {
        funds() {
            return this.$store.getters.fundsFromWallet(this.wallet.id);
        },
        displayType: {
            get() {
                return this.wallet.displayType;
            },
            set(displayType) {
                this.$store.commit('setWalletDisplayType', {walletId: this.wallet.id, displayType});
            }
        },
        rangeInvestValue: {
            get: function () {
                const sVal = '' + this.wallet.investValue;
                const first = parseInt((sVal).charAt(0));
                const valLen = sVal.length;
                return parseInt('' + (valLen - 3) + (first));
            },
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
        CustomRange,
        CustomButton
    },
    props: ['wallet']
}
</script>
