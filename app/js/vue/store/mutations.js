import defaults from '../../defaults'
import { checkDateFormat, distribute } from '../../misc'
import Vue from 'vue';
import Axios from 'axios';
import * as consts from '../../consts.js';
export default {
    getAllFunds(state, { data }) {
        state.funds = data;
    },
    addWallet(state, {
        id,
        name,
        startDate,
        endDate,
        investValue = 10000,
        displayType = consts.WALLET_DISPLAY_TYPE_PERCENTAGE
    }) {
        name = !!name ? name : defaults.walletName;
        Vue.set(
            state.wallets,
            state.wallets.length, {
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
    setWalletDisplayType(state, { walletId, displayType }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet, 'displayType', displayType);
    },
    setWalletStartDate(state, { walletId, date }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet, 'startDate', date);
    },
    setWalletEndDate(state, { walletId, date }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet, 'endDate', date);
    },
    setWalletName(state, { walletId, name }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet, 'name', name);
    },
    setWaletInvestVaue(state, { walletId, value }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        Vue.set(wallet, 'investValue', value);
    },
    addFundToWallet(state, { walletId, fund }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        fund.isLocked = typeof fund.isLocked === 'undefined' ? false : fund.isLocked;
        fund.percentage = typeof fund.percentage === 'undefined' ? 0 : fund.percentage;
        Vue.set(wallet.funds, wallet.funds.length, fund);
    },
    resetPercentages(state, { walletId }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        const funds = wallet.funds;

        for (let i = 0, ii = funds.length; i < ii; i++) {
            const fund = funds[i];
            Vue.set(fund, 'percentage', 100 / funds.length);
        }
    },
    removeFundFromWallet(state, { walletId, fundId }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        const index = wallet.funds.findIndex(fund => fund.id === fundId);

        if (index >= 0) {
            Vue.delete(wallet.funds, index);
        }
    },
    setFundLocked(state, { walletId, fundId, value }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        const fund = wallet.funds.find(fund => fund.id === fundId);

        Vue.set(fund, 'isLocked', value);
    },
    setFundPercentage(state, { walletId, fundId, value }) {
        const wallet = state.wallets.find(wallet => wallet.id === walletId);
        const staticFund = wallet.funds.find(fund => fund.id === fundId);
        const lockedFunds = wallet.funds.filter(f => f.isLocked);

        const activeFundIndex = wallet.funds.findIndex(fund => fund.id === fundId);
        const staticIndexes = [];
        wallet.funds.forEach((f, i) => {
            if (f.isLocked) {
                staticIndexes.push(i);
            }
        })
        staticIndexes.push(activeFundIndex);

        const maxValue = 100 - lockedFunds.reduce((a, b) => a + b.percentage, 0);

        value = Math.min(value, maxValue);

        const funds = wallet.funds.map((f, i) => {
            // Don't change active fund globally before distribute
            // Just mock that it's changed
            if (i === activeFundIndex) {
                return value;
            }
            return f.percentage
        });

        const newValues = distribute(funds, staticIndexes, 100);

        for (let i = 0, ii = wallet.funds.length; i < ii; i++) {
            const fund = wallet.funds[i];
            const val = newValues[i];

            Vue.set(fund, 'percentage', val);
        }
    },
    setWalletLoading({ misc }, { isLoading }) {
        Vue.set(misc, 'isWalletLoading', isLoading);
    },
    setFundsLoading({ misc }, { isLoading }) {
        Vue.set(misc, 'isFundsLoading', isLoading);
    }
};