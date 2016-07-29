var auth = require('./auth.json');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
}

// AUTH TESTS
function authPOST() {
    var payload = auth.POST;
    payload.payload.Item.email = "coryrwest@gmail.com";
    
    console.log(payload);
    
    var command = "echo '" + JSON.stringify(payload) + "' | apex invoke auth";
    
    console.log(command);
    
    exec(command, puts);
}
function authGET() {
    var payload = auth.GET;
    payload.payload.Item.email = "coryrwest@gmail.com";
    
    console.log(payload);
    
    var command = "echo '" + JSON.stringify(payload) + "' | apex invoke auth";
    
    console.log(command);
    
    exec(command, puts);
}
function authPUT() {
    var payload = auth.PUT;
    payload.payload.Item.email = "coryrwest@gmail.com";
    payload.payload.Item.hash = 'a899ac7e6639fcca4497025bd4386e9c040eb28d';
    
    console.log(payload);
    
    var command = "echo '" + JSON.stringify(payload) + "' | apex invoke auth";
    
    console.log(command);
    
    exec(command, puts);
}


// SETTINGS TESTS



function runTests(testToRun) {
    switch(testToRun){
        case 'authPOST':
            authPOST();
            break;
        case 'authGET':
            authGET();
            break;
        case 'authPUT':
            authPUT();
            break;
    }
}

runTests(process.argv[2]);