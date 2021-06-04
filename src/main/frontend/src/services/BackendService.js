import axios from 'axios';

axios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        const token = 'Bearer ' + user.accessToken;
        config.headers.Authorization = token;
    }

    return config;
});

const SERVER_ADDRESS = process.env.REACT_APP_BASE_URI

class BackendService {

    async getTOPProduktList() {
        return await axios.get(SERVER_ADDRESS + "/produkt");
    }

    async getProduktList() {
        return await axios.get(SERVER_ADDRESS + "/produkt/all-products");
    }

    async postNewProdukt(produkt) {
        return await axios.post(SERVER_ADDRESS + "/produkt", produkt);
    }

    async deleteProdukt(id) {
        return await axios.delete(SERVER_ADDRESS + "/produkt/" + id);
    }

    async getDopravaList() {
        return await axios.get(SERVER_ADDRESS + "/doprava");
    }

    async deleteDoprava(id) {
        return await axios.delete(SERVER_ADDRESS + "/doprava/" + id);
    }

    async postNewDoprava(doprava) {
        debugger
        return await axios.post(SERVER_ADDRESS + "/doprava", doprava);
    }

    async getVyrobceList() {
        return await axios.get(SERVER_ADDRESS + "/vyrobce");
    }

    async deleteVyrobce(id) {
        return await axios.delete(SERVER_ADDRESS + "/vyrobce/" + id);
    }

    async postNewVyrobce(vyrobce) {
        return await axios.post(SERVER_ADDRESS + "/vyrobce/", vyrobce);
    }

    async getPlatbaList() {
        return await axios.get(SERVER_ADDRESS + "/platba");
    }

    async deletePlatba(id) {
        return await axios.delete(SERVER_ADDRESS + "/platba/" + id);
    }

    async postNewPlatba(platba) {
        return await axios.post(SERVER_ADDRESS + "/platba/", platba);
    }

    async getCartAddItem(id) {
        return await axios.get(SERVER_ADDRESS + "/cart/add/" + id);
    }

    async getCartItems() {
        return await axios.get(SERVER_ADDRESS + "/cart/show/");
    }

    async getCartDeleteItem(id) {
        return await axios.get(SERVER_ADDRESS + "/cart/delete/" + id);
    }

    async postCartOrderItem(orderDetail) {
        return await axios.post(SERVER_ADDRESS + "/cart/", orderDetail);
    }

    async getNakupy() {
        return await axios.get(SERVER_ADDRESS + "/nakup/");
    }

    async getDetailNakupu(id) {
        return await axios.get(SERVER_ADDRESS + "/nakup/nakup-detail/" + id);
    }

    async getDetailNakupuPolozky(id) {
        return await axios.get(SERVER_ADDRESS + "/nakup/nakup-detail-polozky/" + id);
    }

    async getPotvrdObj(id) {
        return await axios.get(SERVER_ADDRESS + "/nakup/nakup-zmen-stav/" + id);
    }
}

export default new BackendService();