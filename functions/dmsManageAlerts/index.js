'use strict';
let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - payload: a parameter to pass to the operation being performed
 */
 
// Alert class
/*
    Type: sms, email
    Frequency: hourly, daily, weekly
    Time: day of week, time of day
    ChallengePhrase: to prove its you
    DuressPhrase: if under duress
    Notifications: [] emails/sms to notify
    LastCheck: datetime of last check
    MissedCheckins: how many missed checkins to tolerate
*/

exports.handle = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const operation = event.operation;
    
    // Move event data to payload
    // var payload = event.payload;
    // event.payload = {};
    // event.payload.Item = payload;

    if (event.tableName) {
        event.payload.TableName = event.tableName;
    } else {
        event.payload.TableName = 'dms_user_alerts';
    }

    switch (operation) {
        case 'get':
            var params = {
                TableName: event.payload.TableName,
                IndexName: 'email-index',
                KeyConditionExpression: 'email = :key',
                ExpressionAttributeValues: {
                    ':key': event.payload.Item.email
                }
            }
            dynamo.query(params, function(err, data) {
                if(err) {
                    console.log(arguments);
                    callback(err);
                }
                callback(null, data);
            });
            break;
        case 'set':
            event.payload.Item.usersettingid = event.payload.Item.usersettingid || event.payload.Item.email + new Date().getTime();
            //event.payload.ConditionExpression = "attribute_exists(email)";
            console.log(event.payload);
            dynamo.put(event.payload, function(err, data) {
                if(err) {
                    console.log(arguments);
                    callback(err);
                }
                callback(null, event.payload.Item);
            });
            break;
        case 'update':
            var id = event.payload.Item.usersettingid;
            
            var key = {
                Key: { "usersettingid" : id },
                TableName: event.payload.TableName,
                AttributeUpdates: {
                    phoneNumber: { Action: 'PUT', Value: event.payload.Item.phoneNumber }
                }
            };
            
            dynamo.update(key, function(err, data) {
                if(err) {
                    console.log(arguments);
                    callback(err);
                }
                context.succeed('The setting was updated successfully.');
            });
            break;
        case 'delete':
            var id = event.payload.Item.usersettingid;
            
            var key = {
                Key: { "usersettingid" : id },
                TableName: event.payload.TableName
            };
            dynamo.delete(key, function(err, data) {
                if(err) {
                    console.log(arguments);
                    callback(err);
                }
                context.succeed('The setting was deleted successfully.');
            });
            break;
        case 'echo':
            callback(null, event.payload);
            break;
        case 'ping':
            callback(null, 'pong');
            break;
        default:
            callback(new Error(`Unrecognized operation "${operation}"`));
    }
};