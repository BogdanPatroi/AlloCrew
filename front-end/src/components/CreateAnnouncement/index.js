import React from 'react';
import {
  Link, useParams, useLocation, Redirect,
} from 'react-router-dom';
import './style.scss';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const CreateAnnouncement = ({
  handleChange, title, location, description, voluntary, picture, onCreateAnnouncementSubmit, handleChangeEditor, handleDateChange, dateStart, dateEnd, handleChecked, appendImage, uploadImage, notification, onEditAnnouncementSubmit, userId, ownerId, redirect,
}) => {
  const newStartDate = new Date(dateStart);
  const newEndDate = new Date(dateEnd);


  // vérification du bon user
  if (useLocation().pathname.includes('edit') && userId != ownerId && ownerId != 0) {
    return <Redirect to={`/announcement/${useParams().id}`} />;
  }

  if (redirect == 'announcement') {
    return <Redirect to="/my-announcements" />;
  }

  return (
    <div className="createAnnouncement__container">
      <h2 className="createAnnouncement__title">{useParams().id ? 'Editez votre annonce' : 'Créez votre annonce'}</h2>
      <form id="myform" onSubmit={useParams().id ? onEditAnnouncementSubmit : onCreateAnnouncementSubmit}>
        <div className="input create__bannerPicture " style={{ backgroundImage: `url(${picture})` }}>
          <input
            type="file"
            className="input gut"
            name="picture"
            onChange={appendImage}
          />
          <div onClick={uploadImage} className="button">Importer</div>
          {notification && <div className="notification">{notification}</div>}
          <p>Image de l'annonce</p>
        </div>

        <div className="create__mainInfos">
          <div className="mainfos__elem">
            <label className="createAnnouncement__desktop--Title">Titre de l'annonce</label>
            <input
              required
              onChange={handleChange}
              value={title}
              name="title"
              className="createAnnouncement__input input "
              type="text"
              placeholder={title || "Titre de l'annonce"}
            />
          </div>
          <div className="mainfos__elem">
            <label className="createAnnouncement__text createAnnouncement__desktop--Title">Date de début</label>
            <DatePicker
              className="createAnnouncement__input date input"
              showPopperArrow={false}
              selected={newStartDate}
              dateFormat="d MMMM, yyyy"
              onChange={handleDateChange}
              dayClassName={() => 'date_start'}
              required
            />
          </div>
          <div className="mainfos__elem">
            <label className="createAnnouncement__text  createAnnouncement__desktop--Title">Date de fin</label>
            <DatePicker
              className="createAnnouncement__input date input"
              showPopperArrow={false}
              selected={newEndDate}
              dateFormat="d MMMM, yyyy"
              onChange={handleDateChange}
              dayClassName={() => 'date_end'}
            />
          </div>
          <div className="mainfos__elem">
            <label className="createAnnouncement__desktop--Title">Lieu</label>
            <input
              required
              onChange={handleChange}
              value={location}
              name="location"
              className="createAnnouncement__input input "
              type="text"
              placeholder={location || 'Lieu'}
            />
          </div>
        </div>
        <div className="createAnnouncement__botPart">
          <div className="create__radio">
            <input
              className="createAnnouncement__volunteer "
              type="radio"
              id="volonteer"
              name="drone"
              value="volonteer"
              onChange={handleChecked}
              checked={!!voluntary}
            />
            <label htmlFor="volonteer" className="createAnnouncement__radio">Bénévole</label>
            <input
              className="createAnnouncement__paid "
              type="radio"
              id="paid"
              name="paid"
              value="paid"
              onChange={handleChecked}
              checked={!voluntary}
            />
            <label htmlFor="paid" className="createAnnouncement__radio">Rémunéré</label>
          </div>
          <div className="createAnnouncement__overDescription" />
          <div className="createAnnouncement__textarea">
            <label>Description</label>
            <CKEditor
              className="editor"
              editor={ClassicEditor}
              data={description}
              onChange={handleChangeEditor}
              config={{
                removePlugins: ['EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed', 'TableToolbar', 'Table', 'Indent'],
                toolbarLocation: 'bottom',
              }}
            />
          </div>
        </div>
        <div className="createAnnouncement__input mobile drop input">
          <input
            type="file"
            className="input gut"
            name="file"
          />
        </div>

        <div className="createAnnouncement__flex">
          <button type="submit" className="createAnnouncement__button button">Enregister</button>
          <Link to="/home">
            <button className="createAnnouncement__button button">Retour</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
CreateAnnouncement.propTypes = {

  handleDateChange: PropTypes.func.isRequired,
  onCreateAnnouncementSubmit: PropTypes.func.isRequired,
  handleChangeEditor: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  voluntary: PropTypes.bool.isRequired,
  // dateStart: PropTypes.string.isRequired,
  // dateEnd: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  handleChecked: PropTypes.func.isRequired,
  handleNotChecked: PropTypes.func.isRequired,
};

export default CreateAnnouncement;
