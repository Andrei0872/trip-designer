import { CommandCompleteMessage } from "pg-protocol/dist/messages";

const JWT = require('../token/jwt');
const bcrypt = require('bcrypt');
const database = require('../db/index');
const router = require('express').Router();

class UserController {

     async registerUser(email:string, password:string){
        // return True if register is possible (all conditions are met)
        // otherwise, return False

        // Standard email format 
        if (! email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
            return {ok: false, message: "Invalid email or password format!"};

        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character    
        if (! password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
            return {ok: false, message: "Invalid email or password format!"};

        return {ok: true, message: "Valid fields!"};;      
     } 

     async register(req, res){

        // check if user doesn't exist already
        const user = await this.getUserByEmail(req.body.email);
        if (user) {
            return res.status(400).json({
                message: 'User already exists!',
            });
        }

        const validUser =  await this.registerUser(req.body.email, req.body.password);
        console.log(validUser.message);
        if (! validUser.ok){
            // verify the completed fields
            return res.status(422).json({
                message: 'Invalid input!'
            });
        }
    
        const email = req.body.email;
        const encryptedPass = await bcrypt.hash(req.body.password, 10);
        
        let profilePhoto = req.body.profile_photo;
        if (profilePhoto == undefined) 
            profilePhoto = "";

        // insert the user into the table  
        const SQL = `INSERT INTO public.user(email, password, is_admin, profile_photo) VALUES ('${email}', '${encryptedPass}', FALSE, '${profilePhoto}') RETURNING id`; 
        
        const pool = database.getPool();
        const client = await pool.connect();

        try {
            const  insertedUser = await client.query(SQL);
            var userId = insertedUser.rows[0].id;

            console.log("User with id. " + userId + " added with success!");
        }
        catch(err){
            console.error(err);
        }
        finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
        }

        const token = JWT.createAccessToken({ id: userId }); 
        const refreshToken = JWT.createRefreshToken();

        try {
            JWT.storeRefreshToken(userId, refreshToken);    
        } 
        catch (err) {
            console.log(err);

            return res.status(500).json({
                message: 'An error occurred while signing up.',
            });
        }
    
        return res.status(200).json({
            email: email,
            token,
            refreshToken,
            id: userId
        });

              
     } 

     async loginUser(email: string, password: string){
        let user = await this.getUserByEmail(email);
    
        if (!user)
            return { message: "Invalid password or email!", user:user };
         
        const validUser =  await this.verifyUser(password, user.password);
        if (!validUser)
            return { message: "Invalid password or email!", user:user };

        return { message: "Valid email and password!", user:user };
     }

     async login(req, res){
        const result =  await this.loginUser(req.body.email, req.body.password)
        const resultMessage = result.message;
        const user = result.user;

        if (resultMessage.startsWith("Invalid"))
            return res.status(400).json({
                message: resultMessage,
            });

        else if (resultMessage.startsWith("Valid")) {
            
        const token = JWT.createAccessToken({ id: user.id });
        const refreshToken = JWT.createRefreshToken();

        try {
            JWT.storeRefreshToken(user.id, refreshToken); 
        } 
        catch(err) {
            console.log(err);
            return res.status(500).json({
                message: 'Something went wrong while signing in!',
            });
        }

        return res.status(200).json({
            token,
            email: req.body.email,
            refreshToken,
            id: user.id,
         });
        }     
    }
    
    async getUserByEmail(email){
        const SQL = `SELECT * FROM public.user WHERE email = '${email}'`; 
        const pool = database.getPool();
        const client = await pool.connect();
       
        try {
            const res = await client.query(SQL);
            return res.rows[0];
        }
        catch(err){
            console.error(err);
        }
        finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
          }
    }

     async verifyUser (candidatePassword, encryptedPass) {
         return bcrypt.compare(candidatePassword, encryptedPass);
    }
}

const controller = new UserController();

router.post('/login', (req, res) => {
    return controller.login(req, res);
});
router.post('/register', (req, res) => {
    return controller.register(req, res);
})

module.exports = {router: router , userController: controller};