import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";

import CustomersApi from "../services/CustomersApi";
import {Link} from "react-router-dom";
import TableLoader from "../components/loaders/TableLoader";

function CustomersPage(props) {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const itemsPerPage = 10;

    const filteredCustomers = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    );
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

    useEffect(() => {
        fetchCustomers()
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await CustomersApi.findAll();
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleDelete = async id => {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await CustomersApi.delete(id);
        } catch (error) {
            setCustomers(originalCustomers);
            console.log("Error: ", error.response);
        }
    }

    const handlePageChange = page => setCurrentPage(page);


    const handleSearch = event => {
        setSearch(event.currentTarget.value);
        setCurrentPage(1);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link className="btn btn-light mb-3" to="/customers/new">Créer un client</Link>
            </div>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search}
                       className="form-control" placeholder="Rechercher..."/>
            </div>
            {loading && <TableLoader/>}
            {!loading &&
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Factures</th>
                    <th className="text-right">Montant total</th>
                    <th/>
                </tr>

                </thead>
                <tbody>
                {paginatedCustomers.map(
                    customer =>
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td><a href="/">{customer.firstName} {customer.lastName}</a></td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td className="text-center">
                                <span className="badge badge-secondary">{customer.invoices.length}</span></td>
                            <td className="text-right"><strong>{customer.totalAmount.toLocaleString()} DH</strong></td>
                            <td>
                                <button disabled={customer.invoices.length > 0}
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(customer.id)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                )
                }

                </tbody>
            </table>
            }

            {itemsPerPage < filteredCustomers.length &&
            <Pagination currentPage={currentPage}
                        itemsPerPages={itemsPerPage}
                        length={filteredCustomers.length}
                        onPageChanged={handlePageChange}/>
            }

        </>
    );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}
export default CustomersPage;
