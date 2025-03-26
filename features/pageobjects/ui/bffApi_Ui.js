const axios = require("axios");
const fs = require("fs");
const { assert } = require("chai");
const utilTools = require("../../../utils/tools");
require("dotenv").config();

// Import data files
const bffApiData = require("../../../data/bffApiData.json");
const bffApiURL = require("../../../data/bffApiURL.json");
const ConsumerAllTaskData = require("../../../data/consumerAllTasks.json");
const consumerDetailsData = require("../../../data/consumerDetails.json");
const TriviaRewardData = require("../../../data/triviarewarddata.json");
const ApiAssertQues = require("../../../data/QuestionAssert.json");

class ConsumerTasks {
    /**
     * Gets all consumer tasks for UI
     */
    async getAllConsumerTask_UI() {
        try {
            const url = `${process.env.BFF_API_base_URL}v1/bff/get-all-consumer-tasks`;
            console.log("API URL:", url);
            console.log("Payload:", JSON.stringify(bffApiData.get_all_consumer_tasks_Api.currentPayload));

            const response = await this.makeApiRequest(url, 'POST', bffApiData.get_all_consumer_tasks_Api.currentPayload);
            
            await this.validateResponse(response);
            await this.extractAndSaveTaskRewardId(response);

        } catch (error) {
            console.error("Error in getAllConsumerTask_UI:", error.message);
            throw error;
        }
    }

    /**
     * Makes API request for task reward ID
     */
    async taskRewardIdApi() {
        try {
            const url = this.constructTriviaRewardUrl();
            console.log("Trivia Reward URL:", url);

            const response = await this.makeApiRequest(url, 'GET');
            
            await this.validateResponse(response);
            await this.processAndSaveTriviaData(response.data.questions);

        } catch (error) {
            console.error("Error in taskRewardIdApi:", error.message);
            throw error;
        }
    }

    /**
     * Makes an API request with given parameters
     */
    async makeApiRequest(url, method, payload = null) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bffApiData.authToken}`
            }
        };

        if (method === 'POST') {
            return await axios.post(url, JSON.stringify(payload), config);
        }
        return await axios.get(url, config);
    }

    /**
     * Validates API response
     */
    async validateResponse(response) {
        assert.equal(response.status, 200, "Failed to validate response code");
        console.log("API Response Status:", response.status);
    }

    /**
     * Extracts and saves task reward ID
     */
    async extractAndSaveTaskRewardId(response) {
        await browser.pause(6000);
        
        const taskRewardId = response.data.pendingTasks[0].taskReward.taskRewardId;
        console.log("Task Reward ID:", taskRewardId);
        
        ConsumerAllTaskData.triviaRewardId = taskRewardId;
        
        await this.saveJsonToFile(
            `${process.cwd()}/data/consumerAllTasks.json`,
            ConsumerAllTaskData
        );
    }

    /**
     * Constructs trivia reward URL
     */
    constructTriviaRewardUrl() {
        const url = `${process.env.BFF_API_base_URL}v1/trivia/${ConsumerAllTaskData.triviaRewardId}?consumerCode=${consumerDetailsData.consumerCode}`;
        
        bffApiURL.get_trivia_rewardId = url;
        this.saveJsonToFile(`${process.cwd()}/data/bffApiURL.json`, bffApiURL);
        
        return url;
    }

    /**
     * Processes and saves trivia data
     */
    async processAndSaveTriviaData(questions) {
        await this.saveJsonToFile(
            `${process.cwd()}/data/triviarewarddata.json`,
            questions
        );

        await browser.pause(8000);
        await this.processQuestions();
    }

    /**
     * Processes trivia questions
     */
    async processQuestions() {
        for (let i = 0; i <= 3; i++) {
            const questionData = await this.processQuestionData(i);
            this.updateApiAssertQues(i, questionData);
        }

        await this.saveJsonToFile(
            `${process.cwd()}/data/QuestionAssert.json`,
            ApiAssertQues
        );
    }

    /**
     * Processes individual question data
     */
    async processQuestionData(index) {
        const questionJson = TriviaRewardData[index].triviaJson;
        const cleanedJson = questionJson.replace(/\\/g, "");
        return JSON.parse(cleanedJson);
    }

    /**
     * Updates API assert questions
     */
    updateApiAssertQues(index, jsonData) {
        ApiAssertQues[`question_${index}`] = jsonData.questionText;
        ApiAssertQues[`options_${index}`] = jsonData.answerText;
        ApiAssertQues[`answer_${index}`] = jsonData.correctAnswer;
    }

    /**
     * Saves JSON data to file
     */
    async saveJsonToFile(filePath, data) {
        try {
            await fs.promises.writeFile(filePath, JSON.stringify(data));
        } catch (error) {
            console.error(`Error saving file ${filePath}:`, error);
            throw error;
        }
    }
}

module.exports = new ConsumerTasks();