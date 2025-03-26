const axios = require("axios");
const fs = require("fs");
const { faker } = require('@faker-js/faker');
const utilTools = require("../../../utils/tools");
require("dotenv").config();


var genChars = "abcdefghijklmnopqrstuvwxyz";
var genNum = "0123456789";
var genVar = "abcdefghijklmnopqrstuvwxyz123456789";

var datafeedApiData = require("../../../data/dataFeedApi.json");
//let bffApiData = require("../../../data/bffApiData.json");
const datafeedApiUrls = require("../../../data/dataFeedApiUrls.json");
const consumerDetailsData=require("../../../data/consumerDetails.json");
const { assert } = require("chai");


class CreateConsumer{
    async createNewConsumer(url,ApiSessionKey,ApiKey,ResponseCode){        
        let firstName = faker.person.firstName();
        let lastName =  faker.person.lastName();
        datafeedApiData.payload1.members[0].memberDetail.firstName = firstName
        datafeedApiData.payload1.members[0].memberDetail.lastName = "Auto" + lastName
        datafeedApiData.payload1.partnerCode=consumerDetailsData.partnerCode
        datafeedApiData.payload1.members[0].enrollmentDetail.partnerCode=consumerDetailsData.partnerCode
        datafeedApiData.payload1.members[0].memberDetail.memberSince = new Date().toISOString();
        datafeedApiData.payload1.members[0].memberDetail.email = (firstName+lastName+"@yopmail.com").toLowerCase();
        datafeedApiData.payload1.members[0].memberDetail.dob=utilTools.toISOStringDOB();
        datafeedApiData.payload1.members[0].memberDetail.gender = utilTools.genderGenerator();
        let memberNbr = utilTools.generateRandString(30,genVar);
        datafeedApiData.payload1.members[0].enrollmentDetail.memberNbr = memberNbr; // memberNbr(unique)
        datafeedApiData.payload1.members[0].enrollmentDetail.subscriberMemberNbr = memberNbr; // memberNbr and subscriberMemberNbr are same for owner
        datafeedApiData.payload1.members[0].enrollmentDetail.registrationTs = new Date().toISOString();
        datafeedApiData.payload1.members[0].enrollmentDetail.eligibleStartTs = new Date().toISOString();
        datafeedApiData.payload1.members[0].enrollmentDetail.eligibleEndTs = new Date().toISOString(); 
        fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApi.json`,JSON.stringify(await datafeedApiData));
        
        console.log("---------------------------------");
        const response = await axios.post(await url, JSON.stringify(await datafeedApiData.payload1),
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
        consumerDetailsData.consumerCode= response.data.consumers[0].consumer.consumerCode;
        //bffApiData.background.currentPayload.consumerCode= response.data.consumers[0].consumer.consumerCode;
        consumerDetailsData.tenantCode= response.data.consumers[0].consumer.tenantCode;
        fs.writeFileSync(`${process.cwd()}\\data\\consumerDetails.json`,JSON.stringify(consumerDetailsData)); 
        //fs.writeFileSync(`${process.cwd()}\\data\\bffApiData.json`,JSON.stringify(bffApiData));    
    }

    async verifyDataFeedApiErrorResponseCode(ApiSessionKey,ResponseCode){        
      let firstName = faker.person.firstName();
      let lastName =  faker.person.lastName();
      datafeedApiData.payload1.members[0].memberDetail.firstName = firstName
      datafeedApiData.payload1.members[0].memberDetail.lastName = lastName
      datafeedApiData.payload1.partnerCode=consumerDetailsData.partnerCode
      datafeedApiData.payload1.members[0].enrollmentDetail.partnerCode=consumerDetailsData.partnerCode
      datafeedApiData.payload1.members[0].memberDetail.memberSince = new Date().toISOString();
      datafeedApiData.payload1.members[0].memberDetail.email = (firstName+lastName+"@yopmail.com").toLowerCase();
      datafeedApiData.payload1.members[0].memberDetail.dob=utilTools.toISOStringDOB();
      datafeedApiData.payload1.members[0].memberDetail.gender = utilTools.genderGenerator();
      let memberNbr = utilTools.generateRandString(30,genVar);
      datafeedApiData.payload1.members[0].enrollmentDetail.memberNbr = memberNbr; // memberNbr(unique)
      datafeedApiData.payload1.members[0].enrollmentDetail.subscriberMemberNbr = memberNbr; // memberNbr and subscriberMemberNbr are same for owner
      datafeedApiData.payload1.members[0].enrollmentDetail.registrationTs = new Date().toISOString();
      datafeedApiData.payload1.members[0].enrollmentDetail.eligibleStartTs = new Date().toISOString();
      datafeedApiData.payload1.members[0].enrollmentDetail.eligibleEndTs = new Date().toISOString(); 
      fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApi.json`,JSON.stringify(await datafeedApiData));
      datafeedApiUrls.members_api_url = +"v1/data-feed/members";
      //fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApiUrls.json`,JSON.stringify(await datafeedApiUrls));
      var resp;
      let err1
      console.log("**************************************************");
      
      try{
      resp = await axios.post(await datafeedApiUrls.members_api_url, JSON.stringify(await datafeedApiData.payload1),
      {
          headers: {
          'X-API-SESSION-KEY': ApiSessionKey,
          'X-API-Key':datafeedApiData.x_api_key,
          "Content-Type": "application/json",
          },
      }
      );}
      catch(e){
        err1 = e;
      }
      finally{
        console.log("################################# : "+err1.message);
        // console.log("$$$$$$$$$$$$$$$$$$$$$ : "+err1.resp.status);
        assert.equal(err1.message, ResponseCode);
        
      }
  }

    async tokenApi(url,ApiKey,ResponseCode){ 
      console.log("-----------URL---------- : "+ url);
      console.log("-----------API Key ------------ : " + ApiKey);
      const response = await axios.post(url, datafeedApiData.token_API_Payload,
        {
          headers: {
            'X-API-KEY':ApiKey,
            // 'X-API-SESSION-KEY': ApiSessionKey,
            "Content-Type": "application/json",
            },
        }
      );
      this.response = response;
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.response.status);
      assert.equal(ResponseCode, this.response.status);
      datafeedApiData.x_api_session_key= response.data.jwt;
      fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApi.json`, JSON.stringify(datafeedApiData)); 
    }

    async tenantApi(ApiSessionKey,ResponseCode){
      var tenantResponse;
      datafeedApiUrls.tenant_api_url=process.env.Data_Feed_Api_Base_Url+"v1/data-feed/tenant/ten-ecada21e57154928a2bb959e8365b8b4";
      fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApiUrls.json`,JSON.stringify(datafeedApiUrls)); 
      tenantResponse = await axios.get(datafeedApiUrls.tenant_api_url, {params: { tenantCode: "ten-ecada21e57154928a2bb959e8365b8b4" }, 
        headers: {
            'X-API-Key': datafeedApiData.x_api_key,
            'X-API-SESSION-KEY': ApiSessionKey,
            "Content-Type": "application/json",
        },
    });
      this.tenantResponse = tenantResponse;
      console.log('Response Status code for tenant API',this.tenantResponse.status); 
      assert.equal(this.tenantResponse.status, ResponseCode);    
    }
    
    async verifyTenantApiErrorResponseCode(ApiSessionKey,ResponseCode){
      datafeedApiUrls.tenant_api_url=process.env.Data_Feed_Api_Base_Url+"v1/data-feed/tenant/ten-ecada21e57154928a2bb959e8365b8b4";
      fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApiUrls.json`,JSON.stringify(await datafeedApiUrls)); 
      var tenantResponse1
      let error1;
      try{   
        tenantResponse1 = await axios.get(await datafeedApiUrls.tenant_api_url, {params: { tenantCode: "ten-ecada21e57154928a2bb959e8365b8b4" }, 
        headers: {
            'X-API-Key': datafeedApiData.x_api_key,
            'X-API-SESSION-KEY': ApiSessionKey,
            "Content-Type": "application/json",
        },
      });
      this.tenantResponse1 = tenantResponse1;
      console.log('Response Status code for tenant API',this.tenantResponse1.status); 
      }  
    catch(error){  
      error1 = error;
    }
    finally{
      console.log("Error response status code for tenant API : "+error1.message);
      assert.equal(error1.message, ResponseCode);
    }
    }


    async create30Consumers(url,ApiKey){
      var myArray = new Array();
      for(let i=1; i<=30; i++){
        await this.createNewConsumer(url,datafeedApiData.x_api_session_key,ApiKey,200);
        myArray.push(datafeedApiData.payload1.members[0].memberDetail.lastName);
      }
      console.log("-----------Last Name --------------- : " + myArray);
      return myArray;
    }

  }
module.exports = new CreateConsumer();
