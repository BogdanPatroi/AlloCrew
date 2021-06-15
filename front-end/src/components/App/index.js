// import Yarn
import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// import local
import './style.scss';
import socket from '../../socket';

// import Components
import LandPage from '../LandPage';
import Register from '../../containers/Register';
import Login from '../../containers/Login';
import Header from '../../containers/Header';
import Home from '../../containers/Home';
import Profile from '../../containers/Profile';
import Search from '../../containers/Search';
import EditProfile from '../../containers/EditProfile';
import MyAnnouncements from '../../containers/MyAnnouncements';
import CreateAnnouncement from '../../containers/CreateAnnouncement';
import TchatRoom from '../../containers/TchatRoom';
import Footer from '../Footer';
import LegalNotice from '../LegalNotice';
import Contact from '../Contact';
import Information from '../Information';
import Announcement from '../../containers/Announcement';
import FAQ from '../FAQ';
import PAGE404 from '../PAGE404';

const App = ({
  isLogged, userParams, closeParams, notification, email, password, inputChange, changeEmail, changePassword, dispatchSocket,
}) => {
  useEffect(() => {
    socket.on('display-message', dispatchSocket);
    return () => socket.off('display-message');
  });


  // Custom Route for connected user
  const MembersRoute = (props) => {
    if (isLogged) {
      return <Route {...props} component={props.component} />;
    }
    return <Redirect to="/" />;
  };

  // Custom Route for non connected user
  const NonMembersRoute = ({ component }) => {
    if (!isLogged) {
      return <Route component={component} />;
    }
    return <Redirect to="/home" />;
  };

  return (
    <>
      <div className="app__header">
        <Header />
      </div>
      <div className="app__main">
        {/* Routes */}
        <Switch>
          <Route path="/" exact component={LandPage} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/edit-announcement/:id" exact component={CreateAnnouncement} />
          <Route path="/create-announcement" exact component={CreateAnnouncement} />
          <Route path="/edit-profile" exact component={EditProfile} />
          <Route path="/my-announcements" exact component={MyAnnouncements} />
          <Route path="/search" exact component={Search} />
          <Route path="/tchat-room" exact component={TchatRoom} />
          <Route path="/announcement/:id" exact component={Announcement} />
          <Route path="/legal-notice" exact component={LegalNotice} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/information" exact component={Information} />
          <Route path="/faq" exact component={FAQ} />
          <Route path="/*" component={PAGE404} />
        </Switch>
      </div>
      <div className="app__footer">
        <Footer />
      </div>

      {/* Modal for user settings */}
      {
      userParams
    && (
    <div className="app__modal">
      <div className="modal__container">
        <p>Paramètres de connexion</p>
        <div onClick={closeParams} className="closing">+</div>
        <div className="modal_input">
          <input name="email" onChange={inputChange} className="input" type="email" value={email} />
          <input onClick={changeEmail} className="button" value="Modifier l'adresse de contact" type="button" />
          <input name="password" onChange={inputChange} className="input" type="password" value={password} />
          <input onClick={changePassword} className="button" value="Modifier le mot de passe" type="button" />
        </div>
        {notification && <div className="notification">Changements pris en compte</div>}
      </div>
    </div>
    )
    }
    </>
  );
};

export default App;
