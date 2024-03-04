import React, { useState } from 'react';
import './MediaControlCard.css';
import MicIcon from '@mui/icons-material/Mic'; 

const MediaControlCard = () => {
  const [image, setImage] = useState(null);
  const [voice, setVoice] = useState(null); 
  const [audioUrl, setAudioUrl] = useState(null); 

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVoice(file);
        setAudioUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 className="page-heading">Design your personalised card</h1>
      <></>
    <div className="media-control-card">
      <div className="left">
        <label htmlFor="upload-button" className="upload-label">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-button"
            type="file"
            onChange={handleImageChange}
          />
          {image ? (
            <img src={image} alt="Uploaded" className="uploaded-image" />
          ) : (
            <span>Click here to upload image</span>
          )}
        </label>
      </div>
      <div className="right">
        <h2>Send a voice note</h2>
        <label htmlFor="voice-upload-button" className="upload-label">
          <input
            accept="audio/*"
            style={{ display: 'none' }}
            id="voice-upload-button"
            type="file"
            onChange={handleVoiceChange}
          />
          {audioUrl ? (
            <audio controls src={audioUrl} className="uploaded-voice" />
          ) : (
            <span>Upload your voice</span>
          )}
        </label>
      </div>
    </div>
    </div>
  );
};

export default MediaControlCard;
