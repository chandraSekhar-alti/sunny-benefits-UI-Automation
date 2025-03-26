const axios = require("axios");
const fs = require("fs");
require("dotenv").config();
const { faker } = require('@faker-js/faker');
const utilTools = require("../../../utils/tools");
var sweepstakesDataFeed = require("../../../data/sweepstakesData.json");

// const consumerDetailsData=require("../../../data/consumerDetails.json");
const { assert } = require("chai");

var genChars = "abcdefghijklmnopqrstuvwxyz";
var genNum = "0123456789";
var genVar = "abcdefghijklmnopqrstuvwxyz123456789";


class DataFeedAPIForSweepstakes{
    async createConsumerForSweepstakes(url,ApiSessionKey,ApiKey,ResponseCode){        
        let firstName = faker.person.firstName();
        let lastName =  faker.person.lastName();
        sweepstakesDataFeed.payload.members[0].memberDetail.firstName = firstName
        sweepstakesDataFeed.payload.members[0].memberDetail.lastName = "Auto" + lastName
        sweepstakesDataFeed.payload.members[0].memberDetail.memberSince = new Date().toISOString();
        sweepstakesDataFeed.payload.members[0].memberDetail.email = (firstName+lastName+"@yopmail.com").toLowerCase();
        sweepstakesDataFeed.payload.members[0].memberDetail.dob=utilTools.toISOStringDOB();
        sweepstakesDataFeed.payload.members[0].memberDetail.gender = utilTools.genderGenerator();
        let memberNbr = utilTools.generateRandString(30,genVar);
        sweepstakesDataFeed.payload.members[0].enrollmentDetail.memberNbr = memberNbr; // memberNbr(unique)
        sweepstakesDataFeed.payload.members[0].enrollmentDetail.subscriberMemberNbr = memberNbr; // memberNbr and subscriberMemberNbr are same for owner
        sweepstakesDataFeed.payload.members[0].enrollmentDetail.registrationTs = new Date().toISOString();
        sweepstakesDataFeed.payload.members[0].enrollmentDetail.eligibleStartTs = new Date().toISOString();
        sweepstakesDataFeed.payload.members[0].enrollmentDetail.eligibleEndTs = new Date().toISOString(); 
        fs.writeFileSync(`${process.cwd()}\\data\\sweepstakesData.json`,JSON.stringify(await sweepstakesDataFeed));
        
        console.log("---------------------------------");
        const response = await axios.post(await url, JSON.stringify(await sweepstakesDataFeed.payload),
        {
            headers: {
            'X-API-SESSION-KEY': ApiSessionKey,
            'X-API-Key':ApiKey,
            "Content-Type": "application/json",
            },
        }
        );
        this.response = await response;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.response.status);
        assert.equal(ResponseCode, this.response.status);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.response.data.consumers[0].consumer.consumerCode);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.response.data.consumers[0].consumer.tenantCode);
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.response);
        sweepstakesDataFeed.consumerCode= response.data.consumers[0].consumer.consumerCode;
        sweepstakesDataFeed.tenantCode= response.data.consumers[0].consumer.tenantCode;
        fs.writeFileSync(`${process.cwd()}\\data\\sweepstakesData.json`,JSON.stringify(sweepstakesDataFeed)); 
            
    }
  }
module.exports = new DataFeedAPIForSweepstakes();