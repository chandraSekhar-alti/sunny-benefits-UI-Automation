const axios = require("axios");
const fs = require("fs");
const { assert } = require("chai");
const utilTools = require("../../../utils/tools");
require("dotenv").config();
let bffApiData = require("../../../data/bffApiData.json");
const bffApiURL = require("../../../data/bffApiURL.json");
const ConsumerAllTaskData = require(`../../../data/consumerAllTasks.json`);
const cosumerDetailsdata = require(`../../../data/consumerDetails.json`);
const TriviaRewardData = require(`../../../data/triviarewarddata.json`);
let ApiAssertQues = require(`../../../data/QuestionAssert.json`);


// let consumerDetailsData = require("../../../data/consumerDetails.json");

class consumerTasks {
  async getAllConsumerTask_UI() {
    //bffApiURL.get_all_consumer_tasks_api_urlInteg=
    let url =  process.env.BFF_API_base_URL + "v1/bff/get-all-consumer-tasks";
    //fs.writeFileSync(
    //  `${process.cwd()}\\data\\bffApiURL.json`,
     // JSON.stringify(bffApiURL)
    //);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$ " + url)
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%% " +JSON.stringify(bffApiData.get_all_consumer_tasks_Api.currentPayload))
    const response = await axios.post(
      await url, JSON.stringify(bffApiData.get_all_consumer_tasks_Api.currentPayload),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    );
    this.response = response;
    console.log("All consumer task API Response Status : " + response.status);
    assert.equal(
      response.status,
      "200",
      "successfully validated response code"
    );
    // await browser.pause(10000);
    // console.log(
    //   "@@@@@@@@@@@@@@@@@@@@@@@@@: " + (await JSON.stringify(response.data))
    // );
    await browser.pause(6000);
    console.log(
      "@@@@@@@@@@@@@@@@@@@@@@@@@: " +
        (await JSON.stringify(
          response.data.pendingTasks[0].taskReward.taskRewardId
        ))
    );
    ConsumerAllTaskData.triviaRewardId =
      response.data.pendingTasks[0].taskReward.taskRewardId;

    fs.writeFileSync(
      `${process.cwd()}\\data\\consumerAllTasks.json`,
      JSON.stringify(ConsumerAllTaskData)
    );
  }

  async taskRewardIdApi() {
    bffApiURL.get_trivia_rewardId =
      process.env.BFF_API_base_URL +
      `v1/trivia/${ConsumerAllTaskData.triviaRewardId}?consumerCode=${cosumerDetailsdata.consumerCode}`;
    fs.writeFileSync(
      `${process.cwd()}\\data\\bffApiURL.json`,
      JSON.stringify(bffApiURL)
    );
    console.log(
      "############################## : " + bffApiURL.get_trivia_rewardId
    );
    const response = await axios.get(bffApiURL.get_trivia_rewardId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bffApiData.authToken}`,
      },
    });
    this.response = response;
    console.log("All consumer task API Response Status : " + response.status);
    assert.equal(
      response.status,
      "200",
      "successfully validated response code"
    );
    // TriviaRewardData.questions=JSON.stringify(response.data.questions);
    fs.writeFileSync(
      `${process.cwd()}\\data\\triviarewarddata.json`,
      JSON.stringify(response.data.questions)
    );
      await browser.pause(8000);
      let questions_0 = await TriviaRewardData[0].triviaJson;
      let quesVal_0 = questions_0.replace(/\\/g, "");
      const jsonData_0 = JSON.parse(quesVal_0);
      console.log("#######################: " + jsonData_0.questionText);
      ApiAssertQues.question_0 = jsonData_0.questionText;
      ApiAssertQues.options_0 = jsonData_0.answerText;
      ApiAssertQues.answer_0 = jsonData_0.correctAnswer;
      
      let questions_1 = await TriviaRewardData[1].triviaJson;
      let quesVal_1 = questions_1.replace(/\\/g, "");
      const jsonData_1 = JSON.parse(quesVal_1);
      console.log("#######################: " + jsonData_1.questionText);
      ApiAssertQues.question_1 = jsonData_1.questionText;
      ApiAssertQues.options_1 = jsonData_1.answerText;
      ApiAssertQues.answer_1 = jsonData_1.correctAnswer;
   
      let questions_2 = await TriviaRewardData[2].triviaJson;
      let quesVal_2 = questions_2.replace(/\\/g, "");
      const jsonData_2 = JSON.parse(quesVal_2);
      console.log("#######################: " + jsonData_2.questionText);
      ApiAssertQues.question_2 = jsonData_2.questionText;
      ApiAssertQues.options_2 = jsonData_2.answerText;
      ApiAssertQues.answer_2 = jsonData_2.correctAnswer;
    
      let questions_3 = await TriviaRewardData[3].triviaJson;
      let quesVal_3 = questions_3.replace(/\\/g, "");
      const jsonData_3 = JSON.parse(quesVal_3);
      console.log("#######################: " + jsonData_3.questionText);
      ApiAssertQues.question_3 = jsonData_3.questionText;
      ApiAssertQues.options_3 = jsonData_3.answerText;
      ApiAssertQues.answer_3 = jsonData_3.correctAnswer;
    
      // let questions_4 = await TriviaRewardData[4].triviaJson;
      // let quesVal_4 = questions_4.replace(/\\/g, "");
      // const jsonData_4 = JSON.parse(quesVal_4);
      // console.log("#######################: " + jsonData_4.questionText);
      // ApiAssertQues.question_4 = jsonData_4.questionText;
      // ApiAssertQues.options_4 = jsonData_4.answerText;
      // ApiAssertQues.answer_4 = jsonData_4.correctAnswer;
      fs.writeFileSync(
        `${process.cwd()}\\data\\QuestionAssert.json`,
        JSON.stringify(ApiAssertQues)
      );
  }
}

module.exports = new consumerTasks();
