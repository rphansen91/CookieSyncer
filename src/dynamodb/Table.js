const AWS = require('aws-sdk');
const PromiseIffy = require('./Promiseify');
const Env = require('./Env');

AWS.config.update({
    endpoint: Env.endpoint,
    region: Env.region
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const uploadItems = (TableName, data) => {
    return Promise.all((data || [])
    .map((Item) => uploadItem({
        TableName,
        Item
    })));
}

/**
 * 
 * LIST TABLES
 * 
 * var params = {}
 * 
 */

const listTables = PromiseIffy(dynamodb.listTables.bind(dynamodb));

/**
 * 
 * CREATE TABLE
 * 
 * var params = {
 *  TableName: table,
 *  KeySchema: [       
 *    { AttributeName: "year", KeyType: "HASH"},  //Partition key
 *    { AttributeName: "title", KeyType: "RANGE" }  //Sort key
 *  ],
 *  AttributeDefinitions: [       
 *      { AttributeName: "year", AttributeType: "N" },
 *      { AttributeName: "title", AttributeType: "S" }
 *  ],
 *  ProvisionedThroughput: {       
 *     ReadCapacityUnits: 10, 
 *      WriteCapacityUnits: 10
 *  }
 *}
 */
const createTable = PromiseIffy(dynamodb.createTable.bind(dynamodb));

/**
 * 
 * DELETE TABLE
 * 
 * var params = {
 *  TableName: table
 * }
 */
const deleteTable = PromiseIffy(dynamodb.deleteTable.bind(dynamodb));

/**
 * 
 * UPLOAD ITEM
 * 
 * var params = {
 *  TableName: table,
 *  Item:{
 *      "year": year,
 *      "title": title,
 *      "info: info
 *  }
 * }
 */
const uploadItem = PromiseIffy(docClient.put.bind(docClient));

/**
 * 
 * GET ITEM
 * 
 * var params = {
 *  TableName: table,
 *  Key:{
 *      "year": year,
 *      "title": title
 *  }
 *}
 */
const getItem = PromiseIffy(docClient.get.bind(docClient));

/**
 * 
 * UPDATE ITEM
 * 
 * var params = {
 *   TableName:table,
 *   Key:{
 *       "year": year,
 *       "title": title
 *   },
 *   UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
 *   ExpressionAttributeValues:{
 *       ":r":5.5,
 *       ":p":"Everything happens all at once.",
 *       ":a":["Larry", "Moe", "Curly"]
 *   },
 *   ReturnValues:"UPDATED_NEW"
 *}
 */
const updateItem = PromiseIffy(docClient.update.bind(docClient));

/**
 * 
 * DELETE ITEM
 * 
 * var params = {
 *  TableName:table,
 *   Key:{
 *       "year":year,
 *       "title":title
 *   },
 *   ConditionExpression:"info.rating <= :val",
 *   ExpressionAttributeValues: {
 *       ":val": 5.0
 *   }
 *}
 */
const deleteItem = PromiseIffy(docClient.delete.bind(docClient));

const query = PromiseIffy(docClient.query.bind(docClient));
const scan = PromiseIffy(docClient.scan.bind(docClient));

module.exports = {
    listTables,
    createTable,
    deleteTable,
    uploadItems,
    getItem,
    uploadItem,
    updateItem,
    deleteItem,
    query,
    scan
}