const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const fs = require('fs');
const path = require('path');

const folderPath = `${process.cwd()}/net8.0/tmp`;


class commandPromt {
  async runCommand(command1, directory1) {
    try {
      const { stdout, stderr } = await execAsync(command1, { cwd: directory1 });
      if (stderr) {
        console.error(`Error output: ${stderr}`);
        return;
      }
      console.log(`Command output: ${stdout}`);
    } catch (error) {
      console.error(`Error executing command: ${error.message}`);
    }
  }


  async validationOfConsumers(arrayVal) {
    try {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }
        files.forEach(file => {
          if (file.endsWith('.pgp')) {
            const filePath = path.join(folderPath, file);
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                console.error('Error reading file:', err);
                return;
              }
              for (const element of arrayVal) {
                // Perform validation on 'data'
                if (data.includes(element)) {
                  console.log("arrayVal " + element + " is verified");
                  // console.log(`${file} is valid!`);
                } else {
                  console.log(`${file} is not valid!`);
                }
              }
            });

          }
        });
      });
    } catch (error) {
      console.error(`Error executing command: ${error.message}`);
    }
  }


  
  async deletingFiles() {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
      // Loop through each file in the directory
      files.forEach(file => {
        // Check if the file has a .pgp extension
        if (file.endsWith('.pgp')) {
          const filePath = path.join(folderPath, file);

          // Check if the .pgp file exists
          fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
              // File does not exist, nothing to do
              console.log(`File ${filePath} does not exist, nothing to do.`);
              return;
            }

            // Delete the .pgp file
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
                return;
              }
              console.log(`File ${filePath} has been deleted.`);
            });
          });
        }
      });
    });
  }
}
module.exports = new commandPromt();