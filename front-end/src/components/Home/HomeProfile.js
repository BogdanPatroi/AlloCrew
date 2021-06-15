import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import local
import './style.scss';

const HomeProfile = ({
  logout, picture, firstname, lastname, title, id,
}) => (
  <>
    <div className="homeprofile__avatar" id={id} style={{ backgroundImage: `url(${picture})` }} />
    <div className="homeprofile__text">
      <p className="homeprofile__text--name">{firstname} {lastname}</p>
      <p className="homeprofile__text--role">{title}</p>
      <ul>
        <Link to="/profile"><li className="home__liste">Voir mon profil</li></Link>
        <Link to="/edit-profile"><li className="home__liste">Modifier mon profil</li></Link>
        <Link to="/my-announcements"><li className="home__liste">Mes annonces</li></Link>
        <Link to="/tchat-room"><li className="home__liste">Messagerie</li></Link>
        <Link to="/"><li className="home__liste" onClick={logout}>Déconnexion</li></Link>
      </ul>
      <Link to="/create-announcement"><input className="button" type="home__button button" value="Poster une annonce" readOnly /></Link>
    </div>
  </>
);
export default HomeProfile;
