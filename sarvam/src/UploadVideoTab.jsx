import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UploadVideoTab = ({ updateVideoData, }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("en");
  const [transcript, setTranscript] = useState("");

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleVideoUpload = async () => {
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('language', language);

    try {
      const response = await axios.post(`${import.meta.env.VITE_Backend_url}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data)

      const uploadedTranscript = response.data.translation;
      const videoUrl=response.data.videoUrl
      setTranscript(uploadedTranscript)

    // Prepare data to update the parent state
    const uploadedData = {
      videoFile,
      videoUrl,
      title,
      language,
      transcript: response.data.transcript,
    };
    console.log(uploadedData)
    // Call the parent function to update the state
    updateVideoData(uploadedData);


    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Upload Video</h2>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">Hindi</option>
          <option value="es">Spanish</option>
        </select>
        <button onClick={handleVideoUpload}>Upload Video</button>

        {transcript && (
          <div>
            <h3>Transcript:</h3>
            <p>{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadVideoTab;
