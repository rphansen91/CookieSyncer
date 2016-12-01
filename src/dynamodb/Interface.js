'use strict';

var DynamoTable = require('./Table');
var DefaultThroughput = {
    ReadCapacityUnits: 10, 
    WriteCapacityUnits: 10
}

class DynamoInterface {
    constructor (TableName, KeySchema, AttributeDefinitions, Throughput) {
        this.TableName = TableName;
        this.TableSchema = {
            KeySchema,
            AttributeDefinitions,
            ProvisionedThroughput: Throughput || DefaultThroughput
        }
        this.addDecorators();
    }
    addDecorators () {
        Object.keys(DynamoTable).map(key => this.decorate(key))
    }
    decorate (method) {
        this[method] = (params) => {
            const execute = () => {
                return DynamoTable[method](Object.assign({}, params, { 
                    TableName: this.TableName 
                }))
            }

            return this.exists()
            .then((exists) => {
                if (exists) return execute()
                return this.creater()
                .then(() => execute());
            });            
        }
    }
    exists () {
        return DynamoTable.listTables({})
        .then((res) => res.TableNames)
        .then((tables) => tables.indexOf(this.TableName) !== -1)
        .catch((err) => false);
    }
    creater () {
        return DynamoTable.createTable(Object.assign({
            TableName: this.TableName 
        }, this.TableSchema))
        .then(() => console.log("CREATED TABLE: " + this.TableName))
        .catch((err) => console.log(err.message))
    }
    deleter () {
        return this.deleteTable()
        .then(() => this.creater());
    }
}

module.exports = DynamoInterface;