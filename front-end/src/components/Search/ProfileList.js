import React from 'react';
import './style.scss';
import Profile from './Profile';

const ProfileList = ({ list }) => (
  <div className="search">
    {
      list.map((profile) => <Profile key={profile.id} {...profile} />)
    }
  </div>
);
export default ProfileList;
