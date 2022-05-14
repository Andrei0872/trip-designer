const mainService = require('./index');
const database = require('../db');

const bcrypt = require('bcrypt');

class UserService extends mainService{
    constructor(){
        super('user');
    }

    async getUserByEmail(email: string){
        const SQL = `SELECT * FROM user WHERE user.email = '${email}'`; 
        try {
            const res = await database.client.query(SQL);
            return res;
        }
        catch(err){
            console.error(err);
        }
    }

    async verifyUser (candidatePassword:string, encryptedPass:any) {
        return bcrypt.compare(candidatePassword, encryptedPass);
    }
}

module.exports = new UserService();

