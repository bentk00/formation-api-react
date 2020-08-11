import React, {useContext} from 'react';
import AuthAPI from "../services/authAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar({history}) {

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.push("/login");
    }

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">SymReact</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03"
                    aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Clients</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                    </li>

                </ul>
                <ul className="navbar-nav ml-auto">
                    {/* eslint-disable-next-line no-mixed-operators */}
                    {!isAuthenticated && <>
                        <li className="nav-item">
                            <NavLink to="/register" className="btn btn-sm btn-light">Inscription</NavLink>
                        </li>
                        <li className="nav-item mr-1">
                            <NavLink to="/login" className="btn btn-sm btn-light">Connexion</NavLink>
                        </li>
                        {/* eslint-disable-next-line no-mixed-operators */}
                    </> || (
                        <li className="nav-item mr-1">
                            <button onClick={handleLogout} className="btn btn-sm btn-light">Deconnexion</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
