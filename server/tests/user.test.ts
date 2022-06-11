require('dotenv').config()
const userController = require('../controllers/user.controller').userController;
const db = require('../db');

describe('login', () =>{
    test('empty email should result in unsuccessful login', async () => {
        const result = await userController.loginUser("", "some_password");
        expect(result.message).toEqual("Invalid email!");
    });

    test('empty password should result in unsuccessful login', async () => {
        const result = await userController.loginUser("test@gmail.com", "");
        expect(result.message).toEqual("Invalid password!");
    });
   
});

describe('register', () => {

    test('email without the @ symbol and the domain should result in unsuccessful register', async() =>{
        const result = await userController.registerUser("email", "Password123.", false);
        expect(result.message).toEqual("Invalid email format!");
    });

    test('email without the domain should result in unsuccessful register', async() =>{
        const result = await userController.registerUser("email@", "Password123.", false);
        expect(result.message).toEqual("Invalid email format!");
    });

    test('email without full domain should result in unsuccessful register', async() =>{
        const result = await userController.registerUser("email@gmail", "Password123.", false);
        expect(result.message).toEqual("Invalid email format!");
    });

    test('email with too many characters after `.` should result in unsuccessful register', async() =>{
        const result = await userController.registerUser("email@gmail.something", "Password123.", false);
        expect(result.message).toEqual("Invalid email format!");
    });


    test('password with length <8 should result in unsuccessful register', async() =>{
        const result = await userController.registerUser("email@gmail.com", "pass", false);
        expect(result.message).toEqual("Invalid password format!");
    });

    test('password without uppercase letters should result in unsuccessful register', async() =>{
        const result = await userController.registerUser("email@gmail.com", "password", false);
        expect(result.message).toEqual("Invalid password format!");
    });

    test('password without minimum a number should result in unsuccessful register', async() =>{
        const result = await userController.registerUser("email@gmail.com", "Password", false);
        expect(result.message).toEqual("Invalid password format!");
    });

    test('password without minimum one special character should result in unsuccessful register', async() =>{
        const result = await userController.registerUser("email@gmail.com", "Password123", false);
        expect(result.message).toEqual("Invalid password format!");
    });

    test('when user is not customer nor admin should result in unsuccessful register', async() => {
        const result = await userController.registerUser("email@gmail.ro", "Password1!", undefined);
        expect(result.message).toEqual("Undefined isAdmin!");

    });

    test('valid email and password format should result in successful register', async() => {
        const result = await userController.registerUser("email@gmail.ro", "Password1!", false);
        expect(result.message).toEqual("Valid fields!");

    });
})

export {};

