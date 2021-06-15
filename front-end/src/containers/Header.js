import { connect } from 'react-redux';
import Header from '../components/Header';
import { logoutUser, setUserParams } from '../Redux/actions';

const mapStateToProps = ({ login }) => ({
  userId: login.userId,
  isLogged: login.isLogged,
  connectedUser: login.connectedUser,
  notification: login.notification,
});


const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser()),
  openParams: () => dispatch(setUserParams(true)),
});


const logins = connect(mapStateToProps, mapDispatchToProps)(Header);

export default logins;
