export default {
    addWallet() {},
    removeWallet() {},

    setWalletStartDate(store, { date }) {},
    setWalletEndDate(store, { date }) {},
    setWalletName(store, { name }) {},
    setWaletInvestVaue(store, { value }) {},
    setWalletMinimalInvestValue(store, { value }) {},
    setWalletMaximalInvestValue(store, { value }) {},

    addFundToWallet(store, { fundId }) {},
    removeFundFromWallet(store, { fundId }) {},

    setFundStartValue(store, { fundId }, value) {},
    setFundEndValue(store, { fundId }, value) {},
    setFundLocked(store, { fundId }, value) {},
    setFundPercentage(store, { fundId }, value) {},
};