import Axios from 'axios';

export default {
    getAllFunds({ commit }) {
        Axios.get('http://jsonstub.com/getFunds', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'JsonStub-User-Key': '377a406a-4017-4c5a-bec7-3eaafe449d6c',
                'JsonStub-Project-Key': '9c364e79-14e4-49f2-ac3b-61559ed80668'
            },
            data: {}
        }).then(({ data }) => {
            commit('getAllFunds', { data })
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

    // Save state to local storage
    addFundToWallet(store, { fundId }) {},

    // Save state to local storage
    removeFundFromWallet(store, { fundId }) {},

    // Save state to local storage
    setFundStartValue(store, { fundId }, value) {},

    // Save state to local storage
    setFundEndValue(store, { fundId }, value) {},

    // Save state to local storage
    setFundLocked(store, { fundId }, value) {},

    // Save state to local storage
    setFundPercentage(store, { fundId }, value) {},
};