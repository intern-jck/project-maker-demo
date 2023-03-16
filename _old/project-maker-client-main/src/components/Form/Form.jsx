import React, { useState, useEffect } from 'react';

import TextInput from './FormComponents/TextInput.jsx';
import TextArea from './FormComponents/TextArea.jsx';
import DateInput from './FormComponents/DateInput.jsx';
import TagInput from './FormComponents/TagInput.jsx';
import PhotoInput from './FormComponents/PhotoInput.jsx';
// import UploadImage from './FormComponents/UploadImage.jsx';

import './Form.scss';
import './FormComponents/FormComponents.scss';

const Form = ({ project, submitHandler, deleteHandler }) => {

  // const [formId, setFormId] = useState();
  const [formData, setFormData] = useState();
  const [newDate, setNewDate] = useState();
  const [newTag, setNewTag] = useState('');
  const [newPhoto, setNewPhoto] = useState('');

  useEffect(() => {
    // console.log(project)

    setFormData(project);
  }, [project]);

  // TODO: Implement save draft button using:
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  const saveDraft = (event) => {
  };

  // Save Button
  const submitForm = (event) => {
    event.preventDefault();
    submitHandler(formData);
  };

  const deleteForm = (event) => {
    event.preventDefault();
    deleteHandler(project._id);
  };

  const inputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const updatedInput = { [name]: value };
    setFormData((formData) => ({
      ...formData,
      ...updatedInput,
    }));
  };

  const updateTag = (event) => {
    event.preventDefault();
    const tag = event.target.value;
    setNewTag(tag);
  };

  const addTag = (event) => {
    event.preventDefault();
    const { tech } = formData;
    if (newTag) {
      tech.push([newTag, '']);
      setNewTag('');
      setFormData((formData) => ({
        ...formData,
        tech: tech,
      }))
    }
  };

  function removeTag(event) {
    event.preventDefault();
    const index = event.target.getAttribute('data-tag-index');
    const { tech } = formData;
    tech.splice(index, 1);
    setFormData((formData) => ({
      ...formData,
      tech: tech,
    }))
  };

  const updatePhoto = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewPhoto(value);
  };

  const addPhoto = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { photos } = formData;
    if (newPhoto) {
      photos.push(newPhoto);
      setNewPhoto('');
      setFormData((formData) => ({
        ...formData,
        photos: photos,
      }))
    }
  };

  // Remove a photo
  function removePhoto(event) {
    event.preventDefault();
    const index = event.target.getAttribute('data-photo-index');
    const { photos } = formData;
    photos.splice(index, 1);
    setFormData((formData) => ({
      ...formData,
      photos: photos,
    }))
  };

  const getDate = (date) => {
    // TODO format date to create a single string?
    setFormData((formData) => ({
      ...formData,
      date: date,
    }));
  };

  return (
    <>
      {
        formData ?
          <form id='Form' onSubmit={submitForm}>

            <div className='form-menu'>
              <button type='submit' form='Form' value="SAVE">SAVE</button>
              <h1>{project ? project.name : 'NO NAME FOUND'}</h1>
              <button id='delete-form-btn' onClick={deleteForm}>DELETE</button>
            </div>

            <div className='form-row'>
              <div className='form-col'>
                <TextInput
                  name={'name'}
                  value={formData.name ? formData.name : ''}
                  changeHandler={inputChange}
                />
                <TextInput
                  name={'project_url'}
                  value={formData.project_url ? formData.project_url : ''}
                  changeHandler={inputChange}
                />
              </div>
              <div className='form-col'>
                <TextInput
                  id={'form-client'}
                  name={'client'}
                  value={formData.client}
                  changeHandler={inputChange}
                />
                <TextInput
                  id={'form-client_url'}
                  name={'client_url'}
                  value={formData.client_url}
                  changeHandler={inputChange}
                />
              </div>
              <div className='form-col'>
                <TextInput
                  id={'form-category'}
                  name={'category'}
                  value={formData.category ? formData.category : ''}
                  changeHandler={inputChange}
                />
                <DateInput
                  date={formData.date}
                  dateHandler={getDate}
                />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-col'>
                <TextInput
                  id={'form-short'}
                  name={'short'}
                  value={formData.short}
                  changeHandler={inputChange}
                />
                <TextArea
                  id={'form-info'}
                  name={'info'}
                  // rows={6}
                  // cols={20}
                  value={formData.info}
                  changeHandler={inputChange}
                />
              </div>
              <div className='form-col'>
                <PhotoInput
                  name={'photo'}
                  value={newPhoto}
                  photos={formData.photos}
                  changeHandler={updatePhoto}
                  addHandler={addPhoto}
                  deleteHandler={removePhoto}
                />
              </div>
              <div className='form-col'>
                <TagInput
                  name={'tech'}
                  value={newTag}
                  tags={formData.tech}
                  changeHandler={updateTag}
                  addHandler={addTag}
                  deleteHandler={removeTag}
                />
              </div>
            </div>

          </form> : null
      }

    </>
  );
};

export default Form;
