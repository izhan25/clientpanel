import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class ClientDetails extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    // Updating Balance
    onSubmit = e => {
        e.preventDefault();

        const { client, firestore } = this.props;
        const { balanceUpdateAmount } = this.state;

        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        }

        firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
    }

    // Deleting Client
    onDeleteClick = () => {
        const { client, firestore, history } = this.props;

        firestore.delete({ collection: 'clients', doc: client.id })
            .then(history.push('/'));
    }


    render() {
        const { client } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;

        let balanceForm = '';

        if (showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="balanceUpdateAmount"
                            placeholder="Enter New Balance"
                            className="form-control"
                            value={balanceUpdateAmount}
                            onChange={this.onChange}
                            autoComplete="off"
                        />
                        <div className="input-group-apend">
                            <input type="submit" value="Update" className="btn btn-outline-dark" />
                        </div>
                    </div>

                </form>
            );
        } else {
            balanceForm = null;
        }

        if (client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group float-right">
                                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                                    Edit
                                </Link>
                                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className="card">
                        <h4 className="card-header">
                            {client.firstName} {client.lastName}
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                    <h5>
                                        ClientID:
                                        {' '}
                                        <span className="text-secondary">{client.id}</span>
                                    </h5>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <h5 className="pull-right">
                                        Balance: {' '}
                                        <span className={classnames({
                                            'text-danger': client.balance > 0,
                                            'text-success': client.balance === 0
                                        })}>
                                            ${parseFloat(client.balance).toFixed(2)}
                                        </span>
                                        {' '}
                                        <small>
                                            <a href="#!">
                                                <i className="fas fa-pencil-alt" onClick={() => this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate })}></i>
                                            </a>
                                        </small>
                                        {balanceForm}
                                    </h5>
                                </div>
                            </div>

                            <hr />

                            <ul className="list-group">
                                <li className="list-group-item"><small><b>Contact Email:</b></small> {client.email}</li>
                                <li className="list-group-item"><small><b>Contact phone:</b></small> {client.phone}</li>
                            </ul>
                        </div>
                    </div>
                </div >
            )
        }
        else {
            return <Spinner />

        }
    }
}

ClientDetails.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);
