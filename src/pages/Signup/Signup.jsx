import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Signup.scss';

import google from '../../assets/images/google.png';
import facebook from '../../assets/images/facebook.png';
import github from '../../assets/images/github.png';
import girl from '../../assets/images/girl.svg';
import backgroundImage from '../../assets/images/man.jpg';

import { signup, formInputChanged } from '../../actions/signupActions';

export class Signup extends Component {
  form = React.createRef();

  state = {
    toggled: false,
  };

  handleInput = ({ target: { name, value } }) => {
    const { onFormInputChanged } = this.props;
    onFormInputChanged({ name, value });
  };

  onSubmit() {
    const { history, signup, user } = this.props;

    signup(user).then(res => {
      if (res) {
        history.push('/');
      }
    });
  }

  organization() {
    return (
      <div
        className="organization col-md-6 col-sm-12 "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="wrapper h-100">
          <div className="title">Register an organization</div>
          <div className="subtitle">Create an account for your entreprise</div>
          <div
            className="register"
            onClick={() => {
              this.setState({ ...this.state, toggled: true });
            }}
          >
            Register
          </div>
          <Link to="/reset">
            <div className="forgot">Forgot password ?</div>
          </Link>
        </div>
      </div>
    );
  }

  spinner() {
    return <div className="spinner-border " role="status" />;
  }

  organizationForm() {
    const { loading } = this.props;
    return (
      <form
        className="col-md-6 col-sm-12"
        ref={this.form}
        onSubmit={e => e.preventDefault()}
      >
        <div className="title">Register as a company</div>
        <small className="text-danger">{this.props.error}</small>
        <div className="input">
          <div className="label">Organization name</div>
          <input
            type="text"
            name="companyName"
            required
            minLength="3"
            onChange={this.handleInput}
          />
        </div>
        <div className="input">
          <div className="label">Username</div>
          <input
            type="text"
            name="username"
            required
            minLength="3"
            onChange={this.handleInput}
          />
        </div>
        <div className="input">
          <div className="label">Email</div>
          <input
            type="email"
            name="email"
            required
            onChange={this.handleInput}
          />
        </div>
        <div className="input">
          <div className="label">Password</div>
          <input
            type="password"
            name="password"
            required
            minLength="8"
            placeholder="Upercase letters and numbers"
            onChange={this.handleInput}
          />
        </div>
        <div
          className="button"
          onClick={() =>
            this.form.current.reportValidity() ? this.onSubmit() : null
          }
        >
          {loading ? this.spinner() : null}
          <span>REGISTER</span>
        </div>
        <div className="login">
          Already have an account ?
          <Link to="/login">
            <b> Login</b>
          </Link>
        </div>
      </form>
    );
  }

  render() {
    return (
      <section className="signup container d-flex justify-content-center align-items-center col-md-8 col-sm-12 ">
        <div className="row col-md-12 col-sm-12 layout">
          <div className="personal h-100 col-md-6 col-sm-12">
            <div>
              <div className="title">Sign up</div>
              <div className="subtitle">Register a personal account</div>
              <div className="social">
                <div>
                  <img src={google} alt="google" />
                </div>
                <div>
                  <img src={facebook} alt="facebook" />
                </div>
                <div>
                  <img src={github} alt="github" />
                </div>
              </div>
            </div>
            <div className="girl">
              <img src={girl} alt="girl" />
            </div>
          </div>
          {this.state.toggled ? this.organizationForm() : this.organization()}
        </div>
      </section>
    );
  }
}

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ auth }) => {
  const { loading, error, user } = auth;
  return {
    loading,
    error,
    user,
  };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user)),
  onFormInputChanged: data => dispatch(formInputChanged(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
