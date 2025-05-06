import React, { useState } from 'react';
import axios from 'axios';

const VoiceToText = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [textResult, setTextResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) return alert("Please select an audio file first.");

    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/voice-to-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTextResult(response.data.text);
    } catch (error) {
      console.error('Error converting voice to text:', error);
      alert('Error converting voice to text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Voice to Text Converter</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button type="submit">Convert</button>
      </form>

      {loading && <p>Processing...</p>}
      {textResult && (
        <div>
          <h3>Text Result:</h3>
          <p>{textResult}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceToText;
