import Axios from 'axios';

export default {
    getAllFunds({ commit }) {
        commit('setFundsLoading', { isLoading: true });
        Axios.get('/data/funds.json').then(({ data }) => {
            commit('getAllFunds', { data })
            commit('setFundsLoading', { isLoading: false });
        }).catch(e => console.log(e));
    },

    // Save state to local storage
    addWallet() {},

    // Save state to local storage
    removeWallet() {},

    // Get new values for children
    // Save state to local storage
    setWalletStartDate(store, { date }) {},

    // Get new values for children
    // Save state to local storage
    setWalletEndDate(store, { date }) {},

    // Save state to local storage
    setWalletName(store, { name }) {},

    // Get new values for children
    // Save state to local storage
    setWaletInvestVaue(store, { value }) {},

    // Save state to local storage
    setWalletMinimalInvestValue(store, { value }) {},

    // Save state to local storage
    setWalletMaximalInvestValue(store, { value }) {},

    // Get full fund from API and commit changes
    addFundToWallet({ commit }, { walletId, fundId }) {
        commit('setWalletLoading', { isLoading: true });

        const fund = Axios.get('/data/fund' + parseInt(fundId) + '.json').then(({ data: fund }) => {
            commit('addFundToWallet', { walletId, fund });
            commit('resetPercentages', { walletId });
            commit('setWalletLoading', { isLoading: false });
        }).catch(e => console.log(e));
    },

    // Save state to local storage
    removeFundFromWallet({ commit }, { walletId, fundId }) {
        commit('removeFundFromWallet', { walletId, fundId });
        commit('resetPercentages', { walletId });
    },

    // Save state to local storage
    setFundStartValue(store, { fundId }, value) {},

    // Save state to local storage
    setFundEndValue(store, { fundId }, value) {},

    // Save state to local storage
    setFundLocked(store, { fundId }, value) {},

    // Save state to local storage
    setFundPercentage(store, { fundId }, value) {},
};