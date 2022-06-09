import { CommandCompleteMessage } from "pg-protocol/dist/messages";

const {JWT} = require('../token/jwt');
const bcrypt = require('bcrypt');
const database = require('../db/index');
const router = require('express').Router();

class UserController {

     async loginUser(email: string, password: string){
        let user = await this.getUserByEmail(email);
    
        if (!user)
            return { message: "Invalid email!", user:user };
         
        const validUser = this.verifyUser(password, user.password);
        if (!validUser)
            return { message: "Invalid password!", user:user };

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
            
        const token = JWT.createAccessToken({ id: user.id }); //FIXME:  TypeError: Cannot read property 'createAccessToken' of undefined
        const refreshToken = JWT.createRefreshToken();

        try {
            await JWT.storeRefreshToken(user.id, refreshToken); 
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
        console.log("Conn config "+ database.getConnConfig().user);

        const client = await pool.connect();
        console.log("Client:" + client);

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

module.exports = {router: router , userController: controller};