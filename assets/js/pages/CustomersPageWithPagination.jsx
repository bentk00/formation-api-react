import React, {useEffect, useState} from 'react';
import * as axios from "axios";
import Pagination from "../components/Pagination";

function CustomersPageWithPagination(props) {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get(`https://localhost:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data["hydra:member"]);
                setTotalItems(response.data["hydra:totalItems"]);
                setLoading(false);
            })
            .catch(err => console.log(err.response));
    }, [currentPage]);

    const handleDelete = id => {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));
        axios.delete("https://localhost:8000/api/customers/" + id)
            .then(resp => console.log("OK"))
            .catch(err => {
                setCustomers(originalCustomers);
                console.log("error");
            })
    }

    const handlePageChange = page => {
        setCurrentPage(page);
        setLoading(true);
    }

    return (
        <>
            <h1>Liste des clients (API Pagination) !</h1>
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
                {loading &&
                    <tr>
                        <td>Chargement...</td>
                    </tr>
                }
                {!loading &&
                    customers.map(
                        customer =>
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td><a href="/">{customer.firstName} {customer.lastName}</a></td>
                                <td>{customer.email}</td>
                                <td>{customer.company}</td>
                                <td className="text-center">
                                    <span className="badge badge-secondary">{customer.invoices.length}</span></td>
                                <td className="text-right"><strong>{customer.totalAmount.toLocaleString()} DH</strong>
                                </td>
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
            <Pagination currentPage={currentPage}
                        itemsPerPages={itemsPerPage}
                        length={totalItems}
                        onPageChanged={handlePageChange}/>

        </>
    );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}
export default CustomersPageWithPagination;
