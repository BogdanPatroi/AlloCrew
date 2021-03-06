import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const Login = ({
  login, handleChange, email, password, message,
}) => (
  <div className="login__container">
    <form onSubmit={login} className="login__form">
      <h1>Connexion</h1>
      {message && <p className="login__message">{message}</p>}
      <input onChange={handleChange} name="username" className="login__input" type="mail" placeholder="Email" value={email} />
      <input onChange={handleChange} name="password" className="login__input" type="password" placeholder="Mot de passe" value={password} />
      <button className="login__button" type="submit">Se connecter</button>
    </form>
  </div>
);

Login.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
