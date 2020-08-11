import axios from 'axios';
import {CUSTOMERS_API} from "../config";

// get all cutomers
const findAll = () => axios.get(CUSTOMERS_API).then(response => response.data["hydra:member"])

// get one customer by id
const find = id => axios.get(CUSTOMERS_API + "/" + id).then(response => response.data)

// add new customer
const create = customer => axios.post(CUSTOMERS_API, customer);

// update customer by id
const update = (id, customer) => axios.put(CUSTOMERS_API + ("/" + id), customer);

// delete customer by id
const deleteCustomer = id => axios.delete( CUSTOMERS_API + "/" + id);


export default {
    findAll, delete: deleteCustomer, create, update, find
}


