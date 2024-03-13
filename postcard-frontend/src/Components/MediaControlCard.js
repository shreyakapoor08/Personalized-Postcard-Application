import React, { useState } from 'react';
import './MediaControlCard.css';
import MicIcon from '@mui/icons-material/Mic'; 
import axios from 'axios';

const MediaControlCard = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [document, setDocument] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postId, setPostId] = useState(null);

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

      const formDataImage = new FormData();
      formDataImage.append('file-image', image);

      const formDataDocument = new FormData();
      formDataDocument.append('file-document', document);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const responseImage = await axios.post('http://localhost:8080/upload', formDataImage, config);
      const responseDocument = await axios.post('http://localhost:8080/upload-document', formDataDocument, config);
      
      // Assuming the server returns the postId
      setPostId(responseImage.data.postId);

      // Open the dialog
      setDialogOpen(true);
    } catch (error) {
      console.error('Error uploading image or document:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
              <span>Document Uploaded: {document.name}</span>
            ) : (
              <span>Click here to upload document</span>
            )}
          </label>
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Postcard Created</DialogTitle>
        <DialogContent>
          <p>Your postcard has been created successfully. Click the link below to view:</p>
          <a href={`http://localhost:3000/postcard/${postId}`} target="_blank" rel="noopener noreferrer">View Postcard</a>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MediaControlCard;
