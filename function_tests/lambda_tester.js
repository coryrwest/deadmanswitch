var context = {
    fail: function(message) {
        console.log(message);
    },
    succeed: function(message) {
        console.log(message);
    }
}

var callback = function(event, data) {
    console.log(JSON.stringify(data));
}

function runTest() {
    
}