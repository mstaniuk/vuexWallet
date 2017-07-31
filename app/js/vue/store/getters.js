export default {
    wallets(state) {
        return state.wallets
    },
    walletsCount(state) {
        return state.wallets.length;
    },
    fundsFromWallet(state) {
        return (id) => {
            return state.wallets.find(wallet => wallet.id === id).funds;
        }
    },
    walletsWithoutFund(state) {
        return (id) => {
            return state.wallets.filter(wallet => {
                return wallet.funds.findIndex(fund => {
                    return fund.id === id;
                }) < 0
            });
        }
    },
    funds(state) {
        return state.funds
    },
    fundsCount(state) {
        return state.funds.length
    },
};