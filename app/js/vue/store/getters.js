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
    fundsWallet(state) {
        return (id) => {
            return state.wallets.find(wallet => wallet.id === id);
        }
    },
    maxActiveFundValue(state) {
        return (walletId, fundId, maxValue) => {
            const wallet = state.wallets.find(wallet => wallet.id === walletId);
            const nonActiveSum = wallet.funds.reduce((a, b) => {
                if (b.isLocked === false) return a;
                return a + b.percentage
            }, 0);
            return maxValue - nonActiveSum;
        }

    },
    isFundsLoading(state) {
        return state.misc.isFundsLoading;
    },
    isWalletLoading(state) {
        return state.misc.isWalletLoading;
    }
};