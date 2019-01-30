import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }

    onSubmit = e => {
        e.preventDefault();

        const newClient = this.state;

        const { firestore, history } = this.props;

        if (newClient.balance === '') {
            newClient.balance = 0;
        }

        firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'));

    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { firstName, lastName, email, phone, balance } = this.state;
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
                    <div className="card-header">Add Client</div>
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
                                    value={firstName}
                                    onChange={this.onChange}
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
                                    value={lastName}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-Mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="jhon@gmail.com"
                                    className="form-control"
                                    value={email}
                                    onChange={this.onChange}
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
                                    value={phone}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance">Balance</label>
                                <input
                                    type="text"
                                    name="balance"
                                    className="form-control"
                                    value={balance}
                                    onChange={this.onChange}
                                />
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddClient);