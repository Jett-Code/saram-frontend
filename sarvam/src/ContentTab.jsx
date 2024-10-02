import React, { useState } from "react";
import axios from "axios";
import { Client } from "@gradio/client";
import fs from 'fs'; 

const ContentTab = ({ videoDetails }) => {

  const [prompt, setPrompt] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [videoUrl, setVideoUrl] = useState("");


// Async function to handle image generation and saving
async function generateAndSaveImage() {
    try {
        const client = await Client.connect("projektkush/googleaisarvam");

        // Call the predict function with the prompt and model
        const result = await client.predict("/generate_image", {
            prompt: prompt,
            model_name: "imagen-3.0-fast-generate-001",
        });

        // Assuming result.data[0] contains the base64 string of the image
        const base64Image = result.data; // Adjust index based on the API response structure
        const img_url = result.data[0].url;
        console.log(img_url);
        return img_url;

        // Decode the base64 string to binary data
        console.log(base64Image);
        const imageBuffer = Buffer.from(base64Image, 'base64');

        // Write the binary data to a file
        // fs.writeFile('output_image.png', imageBuffer, (err) => {
        //     if (err) throw err;
        //     console.log('Image saved as output_image.png');
        // });

    } catch (error) {
        console.error("Error generating and saving image:", error);
    }
}

  

  const handleImageInsert = async () => {
    try {
     const photoUrl = await generateAndSaveImage()
      console.log(videoDetails);
      console.log(photoUrl);
      const videoUrl=videoDetails.videoUrl
      const body ={
        videoUrl,
        photoUrl,
        timestamp,
      }
      console.log(body)
      const response = await axios.post(`${import.meta.env.VITE_Backend_url}/dynamic-content/addphoto`,body );
      setVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error("Error generating image and inserting into video:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Generate and Insert Image</h2>
        <input
          type="text"
          placeholder="Enter image prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter timestamp (seconds)"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <button onClick={handleImageInsert}>Generate Image and Insert</button>

        {videoUrl && (
          <div>
            <h3>Updated Video:</h3>
            <video controls src={videoUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentTab;
