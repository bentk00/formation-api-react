import React, {useState} from 'react';
import ReactDom from 'react-dom';
import AuthAPI from "./services/authAPI";
import '../css/app.css';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {HashRouter, Route, Switch, withRouter} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import InvoicesPage from "./pages/InvoicesPage";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    const NavbarWithRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={{
            isAuthenticated, setIsAuthenticated}
        }>
            <HashRouter>
                <NavbarWithRouter/>
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/invoices" component={InvoicesPage}/>
                        <PrivateRoute path="/customers/:id" component={CustomerPage}/>
                        <PrivateRoute path="/customers" component={CustomersPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>

            </HashRouter>
        </AuthContext.Provider>

    );
}
const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
