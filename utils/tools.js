function generateRandString(numOfItr,data) {
  var returnStr = "";
  for (var i = 0; i < parseInt(numOfItr); i++) {
    returnStr =
      returnStr + data.charAt(Math.round(data.length * Math.random()));
  }
  return returnStr;
}
function readJson(path) {
  const fs = require("fs");
  const data = JSON.parse(fs.readFileSync(path));
  return data;
}
function toISOStringDOB(){
   const currentDate = new Date(); // Get the current date and time
  const pastDate = new Date(currentDate); // Create a copy of the current date
pastDate.setFullYear(currentDate.getFullYear() - (Math.random() * 10 + 25)); // Subtract 25 years
const isoString = pastDate.toISOString(); // Convert the past date to ISO 8601 format
return isoString;
}
function genderGenerator(){
  const gender = Math.random() < 0.5 ? "female" : "male";
  return gender;
}
module.exports = { generateRandString, readJson, toISOStringDOB, genderGenerator};
