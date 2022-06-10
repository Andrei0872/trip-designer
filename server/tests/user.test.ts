require('dotenv').config()
console.log(process.env.POSTGRES_USER)
const userController = require('../controllers/user.controller').userController;
const db = require('../db'); // create user 

describe('login', () =>{
    test('empty email should result in unsuccessful login', async () => {
        //FIX ME: connect to database, somehow it connects with "windows" username
        const result = await userController.loginUser("", "some_password");
        console.log(result.message);
        console.log(result);
        expect(result.message).toEqual("Invalid email!");
    });
   
});

export {}

