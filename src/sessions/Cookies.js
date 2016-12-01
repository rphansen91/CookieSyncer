'use strict';

var DynamoInterface = require('../dynamodb/Interface');
var Env = require('./Env');
var PrimaryKey = require('./PrimaryKey');
var CreatePrimaryKey = PrimaryKey.CreatePrimaryKey;
var GetPrimaryKey = PrimaryKey.GetPrimaryKey;

class Cookies extends DynamoInterface {
    finder (id) {
        return this.getItem({ Key: CreatePrimaryKey(id) })
        .then(function (data) {
            if (!data || !data.Item || !GetPrimaryKey(data.Item)) return Promise.reject("NOT FOUND")
            return data.Item;
        });
    }
    updater (id, Cookie) {
        return this.updateItem({
            Key: CreatePrimaryKey(id),
            UpdateExpression: `set cookies.${Cookie.partner} = :v`,
            ExpressionAttributeValues:{
                ":v":Cookie.value
            },
            ReturnValues:"ALL_NEW"
        })
        .then((d) => d.Attributes);
    }
    insert (id) {
        const Item = Object.assign(CreatePrimaryKey(id), {
            cookies: {}
        });
        return this.uploadItem({ Item })
        .then(() => Item);
    }
}

module.exports = new Cookies(
    Env.TableName, 
    [{
        AttributeName: Env.KeyName,
        KeyType: 'HASH'
    }],
    [{ 
        AttributeName: Env.KeyName,
        AttributeType: 'S' 
    }]
);