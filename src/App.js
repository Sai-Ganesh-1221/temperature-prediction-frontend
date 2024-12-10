import React, { useState } from 'react';
import Input from './component/Input';
import './App.css';

const App = () => {
  const [inputs, setInputs] = useState({
    loadConsumed: '',
    time: '',
    powerConsumed: '',
    voltageDrop: '',
  });
  const [array, setArray] = useState([]);
  const [result, setResult] = useState('---');
  const [status, setStatus] = useState({ color: 'gray', message: '---' });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const getStatus = (value) => {
    if (value < 17.5) {
      return { color: 'blue', message: 'Alert: Low Value' };
    } else if (value >= 17.5 && value <= 37) {
      return { color: 'green', message: 'Normal' };
    } else if(value >= 37.1 && value <= 45.5){
      return { color: 'yellow', message: 'Alert: increasing' };
    }
    else if(value >= 45.6 && value <= 57.5){
      return { color: 'orange', message: 'Alert: exceeding' };
    }
    else{
      return { color: 'red', message: 'Alert: risk' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the array and make an API call
    setArray([100, inputs.loadConsumed, inputs.time, inputs.powerConsumed, inputs.voltageDrop]);

    const response = await fetch('https://soc-prediction-6.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: array.map((item) => parseFloat(item)), // Convert to list of numbers
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    
    const prediction = responseData['Predicted Temperature (°C)'];

    // Update the result and status
    setResult(prediction);
    console.log(responseData.prediction);
    setStatus(getStatus(prediction));
  };

  return (
    <div>
      <form>
        <div className="box">
          <div className="inp">
            <Input
              name="loadConsumed"
              data={inputs.loadConsumed}
              label="Load Consumed"
              onChange={handleChange}
            />
          </div>
          <div className="inp">
            <Input name="time" data={inputs.time} label="Time" onChange={handleChange} />
          </div>
          <div className="inp">
            <Input
              name="powerConsumed"
              data={inputs.powerConsumed}
              label="Power Consumed"
              onChange={handleChange}
            />
          </div>
          <div className="inp">
            <Input
              name="voltageDrop"
              data={inputs.voltageDrop}
              label="Voltage Drop"
              onChange={handleChange}
            />
          </div>
          <div className="inp">
            <Input name="result" data={result} label="Result" readOnly />
          </div>
          <div className="submi">
            <button
              className="smt"
              onClick={handleSubmit}
              style={{
                backgroundColor: status.color,
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <span className="transition"></span>
              <span className="gradient"></span>
              <span className="label">Submit</span>
            </button>
          </div>
        </div>
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>Status:</h3>
        <p style={{ color: status.color, fontWeight: 'bold' }}>{status.message}</p>
      </div>
      <div>
        <h3>Stored Values:</h3>
        <pre>{JSON.stringify(array, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
