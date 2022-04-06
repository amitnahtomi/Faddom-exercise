import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2'
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);

export default function Charts({usages}){
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])

    useEffect(()=>{
        let l = []
        let d = []
        for(let i = 0; i < usages.length; i++){
            l.push(usages[i].Timestamp)
            d.push(usages[i].Average)
        }
        setLabels(l)
        setData(d)
        console.log(l);
    },[usages])

    return <div style={{heigth: "30%", width: "80%", margin: "auto"}}>
        <Line 
        data={{
            labels: labels,
            datasets: [
              {
                label: "Usages",
                data: data,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              }
            ]
        }}
        />
    </div>
}