import { useRef, useState } from 'react';
import axios from 'axios'
import './App.css';
import Charts from './chart';

function App() {
  const [perf, setPerf] = useState([])
  const startTimeInput = useRef(null)
  const periodInput = useRef(null)
  const ipInput = useRef(null)
  const chartRef = useRef(null)

  const getPerformence = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/${ipInput.current.value}?period=${periodInput.current.value}&startTime=${getStartTime(startTimeInput.current.value)}`)  
      console.log(res.data);
      setPerf(res.data)
      if(chartRef.current.style.display === "none"){
        chartRef.current.style.display = "block"
      }
    } catch (error) {
      alert("Can't find details")
    }
    
  }
  return <div>
    <h1>AWS Instances CPU usage</h1>
    <div>
      Time period: <select ref={startTimeInput}>
        <option value={1}>Last day</option>
        <option value={2}>Last two days</option>
        <option value={3}>Last three days</option>
      </select>
    </div>
    <div>Period: <input ref={periodInput} type={"number"}></input></div>
    <div>IP address: <input ref={ipInput} type={"text"}></input></div>
    <button onClick={getPerformence}>Load</button>
    <div ref={chartRef} style={{display: "none"}}>
      <Charts usages={perf}/>
    </div>
  </div>
}

function getStartTime(daysBack) {
  const timeStamp = new Date().getTime();
  const wantedTime = timeStamp - daysBack * 86400000
  return new Date(wantedTime)
}

export default App;
