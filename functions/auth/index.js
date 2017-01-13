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


exports.handle = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const operation = event.operation;

    var tableName = 'dms_users';

    try {
        switch (operation) {
            case 'createLogin':
                var id = event.payload.Item.email;
                var hash = crypto.randomBytes(20).toString('hex');
                var expiration = new Date().addHours(4).toISOString();
                // Create login if it doesnt exist
                var key = {
                    "Key": { "email" : id },
                    "TableName": tableName
                };
                dynamo.get(key, function(err, data) {
                    if(err) {
                        console.log(arguments);
                        callback(JSON.stringify(err));
                    }
                    if(Object.keys(data).length == 0) {
                        // Create the login
                        var params = {
                            TableName: tableName,
                            Item: {
                                email: id, 
                                authHash: hash,
                                expires: expiration
                            },
                            ConditionExpression: "attribute_not_exists(email)"
                        }
                        console.log(params);
                        dynamo.put(params, function(err, data) {
                            if(err) {
                                console.log(arguments);
                                callback(JSON.stringify(err));
                            }
                            callback(null, params.Item);
                        });
                    } else {
                        var key = {
                            Key: { "email" : id },
                            TableName: tableName,
                            AttributeUpdates: {
                                authHash: { Action: 'PUT', Value: hash },
                                expires: { Action: 'PUT', Value: expiration }
                            }
                        };
                        
                        dynamo.update(key, function(err, data) {
                            if(err) {
                                console.log(arguments);
                                callback(JSON.stringify(err));
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
                                            Data: `Please click the link to login:\n\rhttps://dead-man-switch-coryrwest.c9users.io/public/index.html?email=${id}&auth=${hash}`,
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
                                    context.fail({
                                        message: 'The email could not be sent. ' + err,
                                        isError: true
                                    });
                                    callback(`Unrecognized operation "${err.message}"`);
                                } else {
                                    console.log(data);
                                    context.succeed({message: 'An email was successfully sent to ' + key.Key.email + '. Please check your email for your login link.'});
                                }
                            });
                        });
                    }
                });
                
                break;
            case 'authenticate':
                var id = event.payload.Item.email;
                var hash = event.payload.Item.hash;
                
                var key = {
                    "Key": { "email" : id },
                    "TableName": tableName
                };
                dynamo.get(key, function(what, data) {
                    if(data.Item.authHash === hash) {
                        var key = {
                            Key: { "email" : id },
                            TableName: tableName,
                            AttributeUpdates: {
                                authHash: { Action: 'PUT', Value: 'none' },
                            }
                        };
                        
                        dynamo.update(key, function(err, data) {
                            if(err) {
                                console.log(arguments);
                                callback(JSON.stringify(err));
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
                callback(`Unrecognized operation "${operation}"`);
        }
    } catch (ex) {
        callback(`Unhandled Exception in switch body "${ex.message}"`);
    }
}