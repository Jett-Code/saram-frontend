import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import UploadVideoTab from './UploadVideoTab';
import ContentTab from './ContentTab';
import QuizTab from './QuizTab';

function App() {
  const [videoDetails, setVideoDetails] = useState({
    videoFile: null,
    videoUrl:"",
    title: '',
    language: 'en',
    transcript: '',
  });
  const updateVideoData = (data) => {
    setVideoDetails(data);
  };
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink exact="true" to="/" activeclassname="active">Upload Video</NavLink>
            </li>
            <li>
              <NavLink to="/content" activeclassname="active">Content</NavLink>
            </li>
            <li>
              <NavLink to="/quiz" activeclassname="active">Generate Quiz</NavLink>
            </li>
          </ul>
        </nav>

        {/* Use `Routes` and `Route` for version 6 */}
        <Routes>
          <Route path="/" element={<UploadVideoTab updateVideoData={updateVideoData} />} />
          <Route path="/content" element={<ContentTab videoDetails={videoDetails}/>} />
          <Route path="/quiz" element={<QuizTab  videoDetails={videoDetails}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
