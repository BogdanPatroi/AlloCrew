import { connect } from 'react-redux';
import Login from '../components/Login';
import { logUser, inputLoginChange, message } from '../Redux/actions';

const mapStateToProps = ({ login }) => ({
  username: login.data.username,
  password: login.data.password,
  isLogged: login.isLogged,
  message: login.message,
});

const mapDispatchToProps = (dispatch) => ({
  resetMessage: dispatch(message('')),
  handleChange: (e) => dispatch(inputLoginChange({ [e.target.name]: e.target.value })),
  login: (e) => {
    e.preventDefault(); dispatch(logUser());
  },
});
const login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default login;
