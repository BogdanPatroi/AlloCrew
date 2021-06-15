import React from 'react';
import './style.scss';
import Proptypes from 'prop-types';
import Announce from './Announce';

const AnnouncementList = ({ list, userId }) => (
  <div className="announcementList__container">
    {
      list.sort(({ id: previousID }, { id: currentID }) => currentID - previousID).map((announcement) => <Announce key={announcement.id} {...announcement} />)
    }
  </div>
);
AnnouncementList.propTypes = {
  list: Proptypes.array.isRequired,
};


export default AnnouncementList;
