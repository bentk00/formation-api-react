import axios from 'axios';

function findAll(){
    return axios
        .get(INVOICES_API)
        .then(response => response.data["hydra:member"])
}

function deleteInvoices(id) {
    return axios.delete(INVOICES_API + "/" +  id)
}

export default {
    findAll, delete: deleteInvoices
}
