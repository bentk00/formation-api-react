import React, {useContext, useState} from 'react';
import AuthApi from "../services/authAPI";
import AuthContext from "../context/AuthContext";
import Field from "../components/forms/Field";

function LoginPage({history}) {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState('');

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value});
    }

    const {setIsAuthenticated} = useContext(AuthContext);
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthApi.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/customers")
        } catch (error) {
            console.log(error);
            setError("Auccun compte ne possède cette adresse, ou alors les information ne correspondent pas !");
        }
    }

    return (
        <>
            <h1> Connexion à l'application </h1>
            <form method="post" onSubmit={handleSubmit}>
                <Field label="Adresse email"
                       name="username"
                       type="email"
                       value={credentials.username}
                       onChange={handleChange}
                       placeholder="Adresse email de connexion"
                       error={error}
                />

                <Field label="Mot de passe"
                       name="password"
                       type="password"
                       value={credentials.password}
                       onChange={handleChange}
                />

                <div className="form-group">
                    <button type="submit"
                            className="btn btn-success"
                    >Je me connecte !
                    </button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;
