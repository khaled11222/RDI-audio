import React, { useState } from 'react';
import axios from 'axios';

function EchoPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const [text , setText] = useState([])

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEcho = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    setLoading(true);

    try {
      // Call Kateb API
      let formData = new FormData();
      formData.append('file', file);
      let response = await axios.post('https://echo-6sdzv54itq-uc.a.run.app/kateb', formData);
      let text = response.data.json.words.map(word => word.text).join(' ');

      // Call Natiq API
      response = await axios.post('https://echo-6sdzv54itq-uc.a.run.app/natiq', { text: text });
      let audioData = response.data.wave.toString();
      setText(response.data.durations)
      console.log(response.data.wave.replace('-', '+').replace('_', '/'))
      

      setAudio(audioData);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  console.log(audio?.toString().replace(/\+/g, '-').replace(/\//g, '_'))
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleEcho}>Echo</button>
      {loading && <p>Loading...</p>}
      <audio controls>
  <source src={`data:audio/wav;base64,${audio?.replace(/\+/g, '-').replace(/\//g, '_')}`} type="audio/wav" />
</audio>      <div>{text.map(t=><span>
        {t[0] +" "}  
      </span>)}</div>
    </div>
  );
}

export default EchoPage;