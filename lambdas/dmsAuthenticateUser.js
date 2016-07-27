'use strict';
let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
let crypto = require('crypto');
let ses = new AWS.SES();

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - payload: a parameter to pass to the operation being performed
 */
 
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const operation = event.operation;
    
    // Move event data to payload
    // var payload = event.payload;
    // event.payload = {};
    // event.payload.Item = payload;

    if (event.tableName) {
        event.payload.TableName = event.tableName;
    } else {
        event.payload.TableName = 'dms_users';
    }

    switch (operation) {
        case 'create':
            event.payload.Item.authHash = crypto.randomBytes(20).toString('hex');
            event.payload.Item.expires = new Date().addHours(4).toISOString();
            event.payload.ConditionExpression = "attribute_not_exists(email)";
            console.log(event.payload);
            dynamo.put(event.payload, function(err, data) {
                if(err) {
                    console.log(arguments);
                    callback(err);
                }
                callback(null, event.payload.Item);
            });
            break;
        case 'createLogin':
            var id = event.payload.Item.email;
            
            var key = {
                Key: { "email" : id },
                TableName: "dms_users",
                AttributeUpdates: {
                    authHash: { Action: 'PUT', Value: crypto.randomBytes(20).toString('hex') },
                    expires: { Action: 'PUT', Value: new Date().addHours(4).toISOString() }
                }
            };
            
            dynamo.update(key, function(err, data) {
                if(err) {
                    console.log(arguments);
                    callback(err);
                }
                var params = {
                    Destination: {
                        ToAddresses: [
                            key.Key.email
                        ]
                    },
                    Message: {
                        Subject: {
                            Data: "Your DeadManSwitch Login",
                            Charset: 'UTF-8'
                        },
                        Body: {
                            Text: {
                                Data: 'Your login link: ' + key.AttributeUpdates.authHash,
                                Charset: 'UTF-8'
                            }
                        }
                    },
                    Source: "noreply@westroppstudios.com",
                    ReplyToAddresses: [
                        'No Reply<noreply@westroppstudios.com>'
                    ]
                };
                
                ses.sendEmail(params, function (err, data) {
                    if (err) {
                        console.log(err, err.stack);
                        context.fail('Internal Error: The email could not be sent.');
                    } else {
                        console.log(data);           // successful response
                        context.succeed('The email was successfully sent to ' + event.email);
                    }
                });
            });
            break;
        case 'authenticate':
            var id = event.payload.Item.email;
            var hash = event.payload.Item.hash;
            
            var key = {
                "Key": { "email" : id },
                "TableName": "dms_users"
            };
            dynamo.get(key, function(what, data) {
                if(data.Item.authHash === hash) {
                    var key = {
                        Key: { "email" : id },
                        TableName: "dms_users",
                        AttributeUpdates: {
                            authHash: { Action: 'PUT', Value: 'none' },
                        }
                    };
                    
                    dynamo.update(key, function(err, data) {
                        if(err) {
                            console.log(arguments);
                            callback(err);
                        }
                        callback(null, {"authenticated": true});
                    });
                } else {
                    callback(null, {"authenticated": false});
                }
            });
            break;
        case 'delete':
            // Not yet
            break;
        case 'echo':
            event.payload.Item.authHash = crypto.randomBytes(20).toString('hex');
            event.payload.Item.expires = new Date().addHours(4);
            callback(null, event.payload);
            break;
        case 'ping':
            callback(null, 'pong');
            break;
        default:
            callback(new Error(`Unrecognized operation "${operation}"`));
    }
};