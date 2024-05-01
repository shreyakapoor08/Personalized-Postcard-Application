import React, { useState, useEffect } from 'react';
import './PostcardDetails.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostcardDetails = () => {
  const { postId } = useParams();
  const [postcardDetails, setPostcardDetails] = useState(null);

  const backendHost = process.env.REACT_APP_BACKEND_HOST;
  const backendPort = process.env.REACT_APP_BACKEND_PORT;
  const backendUrl = `http://${backendHost}:${backendPort}`;

  useEffect(() => {
    const fetchPostcardDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/media/${postId}`);
        setPostcardDetails(response.data);
      } catch (error) {
        console.error('Error fetching postcard details:', error);
      }
    };

    fetchPostcardDetails();
  }, [postId]);

  if (!postcardDetails) {
    return <div>Loading...</div>;
  }

  const { imageUrl, extractedText } = postcardDetails;

  return (
    <div>
      <h1 className="page-heading">Find your personalised card below</h1>
      <div className="media-control-card">
        <div className="left">
              <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
        </div>
        <div className="right">
        <h4>{extractedText}</h4>
          <label htmlFor="document-upload-button" className="upload-label" />
        </div>
      </div>
    </div>
  );
};

export default PostcardDetails;
