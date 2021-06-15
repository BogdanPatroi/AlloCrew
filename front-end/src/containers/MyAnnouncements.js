import { connect } from 'react-redux';
import MyAnnouncements from '../components/MyAnnouncements';
import { fetchAnnouncementList, redirect } from '../Redux/actions';

const mapStateToProps = ({ data, login }) => ({
  list: data.announcements,
  userId: login.userId,
});

const mapDispatchToProps = (dispatch) => ({
  redirect: dispatch(redirect(false)),
  fetchData: dispatch(fetchAnnouncementList()),

});
const myannouncements = connect(mapStateToProps, mapDispatchToProps)(MyAnnouncements);

export default myannouncements;
