const Env = require('./Env');

const CreatePrimaryKey = (id) => ({ [Env.KeyName]: id }); 
const GetPrimaryKey = (Item) => Item[Env.KeyName];

module.exports = {
    CreatePrimaryKey,
    GetPrimaryKey
};