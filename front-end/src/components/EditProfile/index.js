import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './style.scss';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditProfile = ({
  id, onEditProfileSubmit, title, firstname, lastname, age, location, description, experience, portfolio, bannerpicture, picture, handleChange, handleChangeEditor1, handleChangeEditor2, redirect, appendImage, notification, uploadImage, uploadAvatar, appendAvatar,
}) => {
  if (redirect) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="editProfile__container">
      <form onSubmit={onEditProfileSubmit} method="patch">
        <div className="editProfile__container">
          <div className="editProfile__pict">
            <div className="input editProfile__pict__cover" style={{ backgroundImage: `url(${bannerpicture})` }}>
              {notification && <div className="notification">{notification}</div>}
              <input
                type="file"
                className="input profile__fileInput"
                name="bannerpicture"
                onChange={appendImage}
              />
              <div onClick={uploadImage} className="button">Importer</div>
            </div>

            <div className="editProfile__pict__editProfile" style={{ backgroundImage: `url(${picture})` }} />
            <button type="submit" className="editProfile__button button">Enregistrer</button>
            <Link to={`/profile/${id}`}>
              <button className="editProfile__buttonRetour button">Retour</button>
            </Link>
            <input
              type="file"
              className="input profile__fileInput"
              name="picture"
              onChange={appendAvatar}
            />
            <div onClick={uploadAvatar} className="import__avatar button">Importer</div>
          </div>
        </div>
        <div className="editProfile__mainInfos">
          <div>
            <label>Nom</label>
            <input onChange={handleChange} value={lastname || ''} name="lastname" type="text" className=" input" placeholder={lastname || 'Nom'} required />
          </div>

          <div>
            <label>Pr??nom</label>
            <input onChange={handleChange} value={firstname || ''} name="firstname" type="text" className=" input" placeholder={firstname || 'Pr??nom'} required />
          </div>

          <div>
            <label>Age</label>
            <input onChange={handleChange} value={age || ''} name="age" type="number" className=" input" placeholder={age || 'Votre ??ge'} />
          </div>

          <div>
            <label>Ville</label>
            <input onChange={handleChange} value={location || ''} name="location" type="text" className=" input" placeholder={location || 'Votre ville'} required />
          </div>


          <div>
            <label>Profession</label>
            <input onChange={handleChange} value={title || ''} name="title" type="text" className=" input" placeholder={title || 'Votre profession'} />
          </div>

        </div>
        <div className="editProfile__textArea">
          <div className="description editor input ">
            <label className="">Description</label>
            <CKEditor
              className="editor"
              editor={ClassicEditor}
              data={description || ''}
              onChange={handleChangeEditor1}
              config={{
                removePlugins: ['EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed', 'TableToolbar', 'Table', 'Indent'],
              }}
            />
          </div>
          <div className="experience editor input ">
            <label className="">Exp??rience</label>
            <CKEditor
              className="editor"
              editor={ClassicEditor}
              data={experience || ''}
              onChange={handleChangeEditor2}
              config={{
                removePlugins: ['EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed', 'TableToolbar', 'Table', 'Indent'],
              }}
            />
          </div>
          <div>
            <label className="">Portfolio:</label>
            <input onChange={handleChange} name="portfolio" type="text" className="editProfile__link input" value={portfolio || ''} placeholder={portfolio || 'Lien vers votre book, votre bande-d??mo, etc...'} />
          </div>
        </div>
      </form>
    </div>

  );
};
EditProfile.propTypes = {
  onEditProfileSubmit: PropTypes.func.isRequired,
  handleChangeEditor: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.number,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  portfolio: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  bannerpicture: PropTypes.string.isRequired,
};

export default EditProfile;
