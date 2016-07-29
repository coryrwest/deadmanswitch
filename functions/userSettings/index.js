'use strict';
let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - payload: a parameter to ass to the operation being performed
 */
 
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

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
        event.payload.TableName = 'dms_user_settings';
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
            event.payload.Item.usersettingid = event.payload.Item.usersettingid || event.payload.Item.email + event.payload.Item.settingName;
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
                    settingValue: { Action: 'PUT', Value: event.payload.Item.settingValue }
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