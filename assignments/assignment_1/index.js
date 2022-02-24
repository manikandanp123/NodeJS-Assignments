const { stdin, stdout } = require("process");


function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    return process.argv[process.argv.length-1];
}

function getNameFromEnv() {
    // Write your code here
    process.env.name="Yash";
    return process.env.name;
}

function getNameFromReadLine() {
    // Write your code here
    const readline=require("readline");

    const r1=readline.createInterface({
        input:process.stdin,
        output:process.stdout
    });
    r1.question("Enter your name ",(ans)=>{console.log("entered name is ",ans)});
    r1.close();
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}
