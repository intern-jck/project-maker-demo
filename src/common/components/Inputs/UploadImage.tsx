import React, {useState} from 'react';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState();

  const updateImage = (event) => {
    console.log(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
  }

  return (
    <div className='UploadImage'>
      <h3>Upload Image</h3>
      {
        selectedImage ?
          <div className='selected-img'>
            <img
              id='sel-img'
              alt='Image Not Found!'
              src={URL.createObjectURL(selectedImage)}
            />
            <button onClick={()=>setSelectedImage(null)}>Remove</button>
          </div> : null
      }

      <input
        type='file'
        name='myImage'
        onChange={updateImage}
      />

    </div>
  );
};

export default UploadImage;
