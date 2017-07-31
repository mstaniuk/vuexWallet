export default {
    wallets(state) {
        return state.wallets
    },
    walletsCount(state) {
        return state.wallets.length;
    },
    walletsWithoutFund(state) {
        return (id) => {
            state.wallets.filter((wallet) => {
                wallet.funds.findIndex((fund) => { fund.id === id }) < 0;
            })
        }
    },
    funds(state) {
        return state.funds
    },
    fundsCount(state) {
        return state.funds.length
    }
};