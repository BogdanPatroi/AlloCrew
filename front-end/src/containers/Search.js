import { connect } from 'react-redux';
import Search from '../components/Search';
import { fetchAnnouncementList, fetchProfileList } from '../Redux/actions';

const mapStateToProps = ({ data }) => ({
  announceList: data.announcements,
  profileList: data.profiles,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProfile: dispatch(fetchProfileList()),
  fetchAnnouncement: dispatch(fetchAnnouncementList()),
});
const search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default search;
