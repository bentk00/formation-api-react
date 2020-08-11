import axios from 'axios';

// customers api uri
const customers_uri = "https://localhost:8000/api/customers";

// get all cutomers
const findAll = () => axios.get(customers_uri).then(response => response.data["hydra:member"])

// get one customer by id
const find = id => axios.get(customers_uri + "/" + id).then(response => response.data)

// add new customer
const create = customer => axios.post(customers_uri, customer);

// update customer by id
const update = (id, customer) => axios.put(customers_uri + ("/" + id), customer);

// delete customer by id
const deleteCustomer = id => axios.delete( customers_uri + "/" + id);


export default {
    findAll, delete: deleteCustomer, create, update, find
}


