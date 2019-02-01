import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyActions';

import Alert from '../layout/Alert';

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    onSubmit = e => {
        e.preventDefault();

        const { firebase, notifyUser } = this.props;
        const { email, password } = this.state;

        firebase
            .login({
                email,
                password
            })
            .catch(err => notifyUser('Invalid Login Credentials', 'error'));
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { message, messageType } = this.props.notify;
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {message ? (
                                <Alert message={message} messageType={messageType} />
                            ) : null}
                            <h4 className="text-center">
                                <span className="text-primary">
                                    <i className="fas fa-lock"></i> Login
                                </span>
                            </h4>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        required
                                    />
                                </div>
                                <input type="submit" value="Login" className="btn btn-primary btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
}

export default compose(
    firebaseConnect(),
    connect(
        (state, props) => ({
            notify: state.notify
        }),
        { notifyUser }
    )
)(Login);
