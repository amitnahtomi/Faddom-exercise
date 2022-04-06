const AWS = require('aws-sdk')
require("dotenv").config()
AWS.config.update({
    "region": process.env.REGION,
    "accessKeyId": process.env.ACCESSID,
    "secretAccessKey": process.env.SECRETKEY
})

const cloudWatch = new AWS.CloudWatch({})
const ec2 = new AWS.EC2()

async function getUsageData(ip, period, startTime) {
    const promise1 = await ec2.describeInstances({Filters: [{Name: "private-ip-address", Values: [ip]}]}).promise()
    const promise2 = await cloudWatch.getMetricStatistics({Namespace: "AWS/EC2", Period: Number(period), MetricName: "CPUCreditUsage", StartTime: new Date(startTime), EndTime: new Date(), Statistics: ["Average"], Dimensions: [{Name: "InstanceId", Value: promise1.Reservations[0].Instances[0].InstanceId}], Unit: "Count"}).promise()
    return promise2
}
module.exports = {getUsageData}