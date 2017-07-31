import defaults from '../../defaults'
import { checkDateFormat, fakeData } from '../../misc'
import Vue from 'vue';
import Axios from 'axios';

export default {
    fillData(state) {
        state.funds = fakeData;
    },

    addWallet(state, { id, name, startDate, endDate, investValue = 10000, displayType = 'percent' }) {
        name = !!name ? name : defaults.walletName;
        Vue.set(
            state.wallets,
            state.wallets.length,
            {
                id,
                name,
                startDate,
                endDate,
                investValue,
                displayType,
                funds: []
            }
        )
    },
    removeWallet(state, { id }) {
        const index = state.wallets.findIndex(wallet => wallet.id === id);

        if (index >= 0) {
            Vue.delete(state.wallets, index)
        }
    },

    setWalletStartDate(state, { walletId, date }) {
        let wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet, 'startDate', date);
    },
    setWalletEndDate(state, { walletId, date }) {
        let wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet, 'endDate', date);
    },
    setWalletName(state, { walletId, name }) {
        let wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet, 'name', name);
    },
    setWaletInvestVaue(state, { walletId, value }) {
        let wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet, 'investValue', value);
    },
    addFundToWallet(state, { walletId, fund }) {
        // Fund will be fetched by Ajax inside Action
        let wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet.funds, wallet.funds.length, fund);
    },
    removeFundFromWallet(state, { walletId, fundId }) {
        let wallet = state.wallets.find(wallet => wallet.id === walletId);
        let index = wallet.funds.findIndex(fund => fund.id === fundId);

        if (index >= 0) {
            Vue.delete(wallet.funds, index);
        }
    },

    setFundLocked(state, { walletId, fundId, value }) {
        let wallet = state.wallets.find(wallet => wallet.id === walletId);
        let fund = wallet.funds.find(fund => fund.id === fundId);

        Vue.set(fund, 'isLocked', value);
    },
    setFundPercentage(state, { walletId, fundId, value }) {
        let wallet = state.wallets.find(wallet => wallet.id === walletId);
        let fund = wallet.funds.find(fund => fund.id === fundId);

        Vue.set(fund, 'percentage', value);
    },
};