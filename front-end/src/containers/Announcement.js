import { connect } from 'react-redux';
import Announcement from '../components/Announcement';
import {
  checkData, postDiscussion, deleteAnnouncement,
} from '../Redux/actions';

const mapStateToProps = ({ data, login }, { match }) => {
  // if data isnt in the list , load from db
  let announcement = data.announcements.find((one) => one.id == match.params.id);
  if (!announcement) {
    announcement = data.announcement;
  }

  return ({
    redirect: login.redirect,
    title: announcement.title,
    location: announcement.location,
    description: announcement.description,
    picture: announcement.picture,
    voluntary: announcement.voluntary,
    id: announcement.id,
    dateStart: announcement.dateStart,
    dateEnd: announcement.dateEnd,
    active: announcement.active,
    user: announcement.user,
    createdAt: announcement.createdAt,
    userId: login.userId,
  });
};

const mapDispatchToProps = (dispatch, { match }) => ({

  fetchData: dispatch(checkData(match.params.id)),

  sendingMessage: (param) => dispatch(postDiscussion(param)),

  deleteD: (e) => {
    e.preventDefault();
    dispatch(deleteAnnouncement(e.target.name));
  },

});


const announcement = connect(mapStateToProps, mapDispatchToProps)(Announcement);

export default announcement;
