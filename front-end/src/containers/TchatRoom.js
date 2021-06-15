import { connect } from 'react-redux';
import TchatRoom from '../components/TchatRoom';
import {
  fetchDiscussionList, deleteDiscussion, inputMessage, postMessage, resetSocket, redirect, passId,
} from '../Redux/actions';


const mapStateToProps = ({ messagerie, login }) => ({
  content: messagerie.message.content,
  chatList: [...messagerie.by_creator, ...messagerie.by_receiver],
  userId: login.userId,
  userFirstname: login.userInfo.firstname,
  socketMsg: messagerie.socketMsg,
});
const mapDispatchToProps = (dispatch) => ({

  redirect: dispatch(redirect('')),

  fetchData: dispatch(fetchDiscussionList()),

  refreshData: () => {
    dispatch(fetchDiscussionList()); dispatch(resetSocket());
  },

  handleMessage: (e) => dispatch(inputMessage({ content: e.target.value })),

  onMessageSubmit: (e) => {
    dispatch(postMessage(e));
    dispatch(inputMessage({ content: '' }));
  },

  deleteD: (chatId) => {
    dispatch(deleteDiscussion(chatId));
  },
});
const tchatroom = connect(mapStateToProps, mapDispatchToProps)(TchatRoom);

export default tchatroom;
