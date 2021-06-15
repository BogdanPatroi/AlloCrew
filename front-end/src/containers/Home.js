import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  fetchProfile, fetchAnnouncementList, logoutUser, passId, clearNotification,
} from '../Redux/actions';

const mapStateToProps = ({ data, login }) => ({
  userId: login.userId,
  homeProfile: login.userInfo,
  list: data.announcements,
});


const mapDispatchToProps = (dispatch) => ({
  resetNotif: dispatch(clearNotification()),
  fetchHomeProfile: dispatch(passId(fetchProfile)),
  fetchAnnouncements: dispatch(fetchAnnouncementList()),
  logout: () => dispatch(logoutUser()),
});


const home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default home;
