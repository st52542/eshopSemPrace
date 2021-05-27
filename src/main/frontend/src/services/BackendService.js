import axios from 'axios';

axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.accessToken){
        const token = 'Bearer ' + user.accessToken;
        config.headers.Authorization =  token;
    }

    return config;
});

const SERVER_ADDRESS = "http://localhost:8080"

class BackendService {
    async getUserBoard() {
        return await axios.get(SERVER_ADDRESS + "/api/test/user");
    }

    async getPmBoard() {
        return await axios.get(SERVER_ADDRESS + "/api/test/pm");
    }

    async getAdminBoard() {
        return await axios.get(SERVER_ADDRESS + "/api/test/admin");
    }

    async getTOPProduktList() {
        return await axios.get(SERVER_ADDRESS + "/produkt");
    }
    async getProduktList() {
        return await axios.get(SERVER_ADDRESS + "/produkt/all-products");
    }

    async postNewProdukt(produkt) {
        return await axios.post(SERVER_ADDRESS + "/produkt/uloz-produkt", produkt);
    }
    async deleteProdukt(id) {
        return await axios.delete(SERVER_ADDRESS + "/produkt/smaz/" + id);
    }
    async changeProdukt(id) {
        return await axios.get(SERVER_ADDRESS + "/produkt/produkt-reg-form/" + id);
    }
    async getDopravaList() {
        return await axios.get(SERVER_ADDRESS + "/doprava");
    }
    async deleteDoprava(id) {
        return await axios.delete(SERVER_ADDRESS + "/doprava/smaz/" + id);
    }
    async postNewDoprava(doprava) {
        debugger
        return await axios.post(SERVER_ADDRESS + "/doprava/uloz-dopravu", doprava);
    }
    async getVyrobceList() {
        return await axios.get(SERVER_ADDRESS + "/vyrobce");
    }
    async deleteVyrobce(id) {
        return await axios.delete(SERVER_ADDRESS + "/vyrobce/smaz/" + id);
    }
    async postNewVyrobce(vyrobce) {
        return await axios.post(SERVER_ADDRESS + "/vyrobce/uloz-vyrobce", vyrobce);
    }
    async getPlatbaList() {
        return await axios.get(SERVER_ADDRESS + "/platba");
    }
    async deletePlatba(id) {
        return await axios.delete(SERVER_ADDRESS + "/platba/smaz/" + id);
    }
    async postNewPlatba(platba) {
        return await axios.post(SERVER_ADDRESS + "/platba/uloz-platbu", platba);
    }
}

export default new BackendService();