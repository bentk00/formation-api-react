import axios from 'axios';
import {INVOICES_API} from "../config";

function findAll(){
    return axios
        .get(INVOICES_API)
        .then(response => response.data["hydra:member"])
}

function deleteInvoices(id) {
    return axios.delete(INVOICES_API + "/" + id)
}

export default {
    findAll, delete: deleteInvoices
}
