const express = require('express')
const app = express()
const cors = require('cors')
const {getUsageData} = require('./awsInfo')
const moment = require('moment')

app.use(express.json())
app.use(cors())

app.get('/:ip', async (req, res)=>{
    const {ip} = req.params
    const {period, startTime} = req.query
    const usages = getUsageData(ip, period, startTime)
    usages.then((data)=>{
        let sortedDates = data.Datapoints.sort((a,b)=>a.Timestamp-b.Timestamp)
        for(let i = 0; i < sortedDates.length; i++){
            sortedDates[i].Timestamp = moment(sortedDates[i].Timestamp).format('lll')
        }
        res.send(sortedDates)
        res.end()
        return
    })
})

app.listen(8080, ()=>{
    console.log("running on port 8080");
})