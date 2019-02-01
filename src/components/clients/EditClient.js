import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class EditClient extends Component {

    constructor(props) {
        super(props);

        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

    onSubmit = e => {
        e.preventDefault();

        const { client, firestore, history } = this.props;

        const updClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
        }

        firestore.update({ collection: 'clients', doc: client.id }, updClient)
            .then(history.push('/'));
    }

    render() {
        const { client } = this.props;
        const { disableBalanceOnEdit } = this.props.settings;

        if (client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">Edit Client</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Jhon"
                                        className="form-control"
                                        minLength="2"
                                        required
                                        ref={this.firstNameInput}
                                        defaultValue={client.firstName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Doe"
                                        className="form-control"
                                        minLength="2"
                                        required
                                        ref={this.lastNameInput}
                                        defaultValue={client.lastName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-Mail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="jhon@gmail.com"
                                        className="form-control"
                                        ref={this.emailInput}
                                        defaultValue={client.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="333-333-3333"
                                        className="form-control"
                                        minLength="10"
                                        required
                                        ref={this.phoneInput}
                                        defaultValue={client.phone}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="balance">Balance</label>
                                    <input
                                        type="text"
                                        name="balance"
                                        className="form-control"
                                        ref={this.balanceInput}
                                        defaultValue={client.balance}
                                        disabled={disableBalanceOnEdit}
                                    />
                                </div>
                                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Spinner />;
        }

    }
}

EditClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered }, settings }, props) => ({
        client: ordered.client && ordered.client[0],
        settings
    }))
)(EditClient);
