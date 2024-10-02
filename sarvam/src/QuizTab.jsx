import React, { useState } from "react";
import axios from "axios";

const QuizTab = ({videoDetails}) => {
  const [generateQuiz, setGenerateQuiz] = useState(false);
  const [quizText, setQuizText] = useState("");

  const handleQuizGeneration = async () => {
    if (generateQuiz) {
      try {
        const transcript = videoDetails.transcript
        // const transcript = "sun water life"
        const response = await axios.post(`${import.meta.env.VITE_Backend_url}/quizzes`,{
          transcript: transcript
        });
        setQuizText(response.data.result);
      } catch (error) {
        console.error("Error generating quiz:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Generate Quiz</h2>
        <label>
          <input
            type="checkbox"
            checked={generateQuiz}
            onChange={() => setGenerateQuiz(!generateQuiz)}
          />
          Generate a quiz for this video
        </label>
        <button onClick={handleQuizGeneration}>Generate Quiz</button>

        {quizText && (
          <div>
            <h3>Quiz:</h3>
            <p>{quizText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizTab;
