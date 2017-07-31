import defaults from '../../defaults'
import { checkDateFormat, fakeData } from '../../misc'
import Axios from 'axios';

export default {
    fillData(state) {
        state.funds = fakeData;
    },

    addWallet(state, { name, startDate, endDate }) {
        name = !!name ? name : defaults.walletName;
        let id = state.wallets.length;

        state.wallets.push({
            id,
            name,
            startDate,
            endDate,
            funds: []
        });

    },
    removeWallet(state, { id }) {
        const index = state.wallets.findIndex((el) => {
            return el.id === id;
        });

        if (index >= 0) {
            state.wallets.splice(index, 1);
        }
    },

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