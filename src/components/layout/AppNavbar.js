import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AppNavbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">

                    <Link to="/" className="navbar-brand">
                        Client Panel
                    </Link>

                    <button className="navbar-toggler" type="button" data-target="#navbarMain" data-toggle="collapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse mr-auto" id="navbarMain">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        )
    }
}

export default AppNavbar;
