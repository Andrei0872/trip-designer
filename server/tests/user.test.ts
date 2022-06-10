require('dotenv').config()
const userController = require('../controllers/user.controller').userController;
const db = require('../db');

describe('login', () =>{
    test('empty email should result in unsuccessful login', async () => {
        const result = await userController.loginUser("", "some_password");
        console.log(result.message);
        console.log(result);
        expect(result.message).toEqual("Invalid email!");
    });
   
});

export {}

