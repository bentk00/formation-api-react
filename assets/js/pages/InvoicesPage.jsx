import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import InvoicesApi from "../services/InvoicesApi";
import moment from "moment";

function InvoicesPage(props) {

    const STATUS_CLASSES = {
        PAID: "success",
        SENT: "secondary",
        CANCELLED: "warning"
    }
    const STATUS_LABELS = {
        PAID: "Payée",
        SENT: "Envoyée",
        CANCELLED: "Annulée"
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [invoices, setInvoices] = useState([]);

    const itemsPerPage = 10;

    const fetchInvoices = async () => {
        try {
            const data = await InvoicesApi.findAll();
            setInvoices(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response);
        }
    }
    const formatDate = str => moment(str).format('DD/MM/YYYY');


    const filteredCInvoices = invoices.filter(i =>
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().startsWith(search.toLowerCase()) ||
        STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );

    const paginatedInvoices = Pagination.getData(filteredCInvoices, currentPage, itemsPerPage);

    useEffect(() => {
        fetchInvoices()
    }, []);


    const handlePageChange = page => setCurrentPage(page);

    const handleSearch = event => {
        setSearch(event.currentTarget.value);
        setCurrentPage(1);
    }

    const handleDelete = async id => {
        const original = [...invoices];
        setInvoices(invoices.filter(invoices => invoices.id !== id));
        try {
            await InvoicesApi.delete(id);
            console.log("Success: ");
        } catch (error) {
            setInvoices(original);
            console.log("Error: ", error.response);
        }
    }

    function handleEdit(id) {
        return undefined;
    }

    return (
        <>
            <h1>Liste des factures</h1>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search}
                       className="form-control" placeholder="Rechercher..."/>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numéro.</th>
                    <th>Client</th>
                    <th>Date d'envoi</th>
                    <th className="text-center">Statut</th>
                    <th className="text-right">Montant</th>
                    <th className="text-right"/>
                </tr>

                </thead>
                <tbody>
                {loading &&
                <tr>
                    <td>Chargement...</td>
                </tr>
                }
                {!loading &&
                paginatedInvoices.map(
                    invoice =>
                        <tr key={invoice.id}>
                            <td>{invoice.chrono}</td>
                            <td><a href="/">{invoice.customer.firstName} {invoice.customer.lastName}</a></td>
                            <td>{formatDate(invoice.sentAt)}</td>
                            <td className="text-center">
                                <span
                                    className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                            </td>
                            <td className="text-right">
                                <strong>{invoice.amount && invoice.amount.toLocaleString()} DH</strong>
                            </td>
                            <td className="text-right">
                                <button
                                    className="btn btn-sm btn-light mr-1 mb-1"
                                    onClick={() => handleEdit(invoice.id)}>
                                    Editer
                                </button>
                                <button
                                    className="btn btn-sm btn-light mb-1"
                                    onClick={() => handleDelete(invoice.id)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                )
                }

                </tbody>
            </table>
            {itemsPerPage < filteredCInvoices.length &&
            <Pagination currentPage={currentPage}
                        itemsPerPages={itemsPerPage}
                        length={filteredCInvoices.length}
                        onPageChanged={handlePageChange}/>
            }

        </>
    );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}
export default InvoicesPage;
