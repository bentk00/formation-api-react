import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import CustomersApi from "../services/CustomersApi";

function CustomerPage({history, match}) {

    const {id = "new"} = match.params;

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [editing, setEditing] = useState(false);

    const fetchCustomer = async id => {
        try {
            const {firstName, lastName, email, company} = await CustomersApi.find(id);
            setCustomer({firstName, lastName, email, company});
        } catch (error) {
            console.log(error.response);
            history.replace("/customers");
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value});
    }


    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
                await CustomersApi.update(id, customer)
            } else {
                await CustomersApi.create(customer)
                history.replace("/customers");
            }
            setErrors({});
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    {!editing &&
                    <h2 className="mb-3">Creation d'un nouveau client</h2>
                    || <h2 className="mb-3">Modification du client</h2>
                    }

                    <form onSubmit={handleSubmit}>
                        <Field name="lastName" label="Nom de famille" placeholder="Nom de famille du client" small
                               value={customer.lastName} onChange={handleChange} error={errors.lastName}/>

                        <Field name="firstName" label="Prénom" placeholder="Prénom du client" small
                               value={customer.firstName} onChange={handleChange} error={errors.firstName}/>

                        <Field name="email" label="Email" placeholder="Email du client" type="email" small
                               value={customer.email} onChange={handleChange} error={errors.email}/>

                        <Field name="company" label="Entreprise" placeholder="Entreprise du client" small
                               value={customer.company} onChange={handleChange} error={errors.company}/>

                        <div className="form-group d-flex justify-content-between align-items-center mt-3">
                            <button type="submit" className="btn btn-sm btn-outline-success mr-3">
                                Enregistrer
                            </button>
                            <Link to="/customers" className="btn btn-sm btn-outline-info">Retour à la liste</Link>
                        </div>
                    </form>
                </div>
            </div>

        </>

    );
}

export default CustomerPage;
