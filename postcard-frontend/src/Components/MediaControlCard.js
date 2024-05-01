import React, { useState } from 'react';
import './MediaControlCard.css';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const MediaControlCard = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [document, setDocument] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const [email, setEmail] = useState('');

  const backendHost = process.env.REACT_APP_BACKEND_HOST;
  const backendPort = process.env.REACT_APP_BACKEND_PORT;
  const backendUrl = `http://${backendHost}:${backendPort}`;

  const frontendHost = process.env.REACT_APP_FRONTEND_HOST;
  const frontendPort = process.env.REACT_APP_FRONTEND_PORT;
  const frontendUrl = `http://${frontendHost}:${frontendPort}`;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocument(file);
        setDocumentUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!image || !document) {
        console.error('Image or document not selected');
        return;
      }
  
      const formData = new FormData();
      formData.append('file-document', document);
      formData.append('file-image', image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
  
      const response = await axios.post(`${backendUrl}/upload-media`, formData, config);
      
      const postId = response.data;
      console.log("post id is", postId);
      // Assuming the server returns the postId
      setPostId(postId);
  
      // Open the dialog
      setDialogOpen(true);
    } catch (error) {
      console.error('Error uploading media:', error);
    }
  };

  const handleShare = async () => {
    try {
      const requestBody = { email, postId };
      await axios.post(`${backendUrl}/send-email`, requestBody);
      console.log('Email shared successfully');
    } catch (error) {
      console.error('Error sharing email:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <h1 className="page-heading">Design your personalised card</h1>
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
              <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
            ) : (
              <span>Click here to upload image</span>
            )}
          </label>
        </div>
        <div className="right">
          <h2>Upload a document with customised note</h2>
          <label htmlFor="document-upload-button" className="upload-label">
            <input
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              id="document-upload-button"
              type="file"
              onChange={handleDocumentChange}
            />
            {documentUrl ? (
              <span>Document Uploaded: <span>{document.name.length > 25 ? `${document.name.substring(0, 25)}...` : document.name}</span></span>
            ) : (
              <span>Click here to upload document</span>
            )}
          </label>
        </div>
      </div>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginBottom: '20px' }}>Submit</Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Postcard Created</DialogTitle>
        <DialogContent>
          <p>Your postcard has been created successfully. Click the link below to view:</p>
          <a href={`${frontendUrl}/postcard/${postId}`} target="_blank" rel="noopener noreferrer">View Postcard</a>
          <TextField
            label="Enter Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            style={{ marginTop: '20px', width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShare} color="primary">Share</Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MediaControlCard;
