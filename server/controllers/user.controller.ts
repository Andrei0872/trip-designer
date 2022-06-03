const {JWT} = require('../token/jwt');
const bcrypt = require('bcrypt');
const database = require('../db/index');
const router = require('express').Router();

class UserController {

     async login(req, res){
        let user = await this.getUserByEmail(req.body.email);
        if (!user){
            return res.status(400).json({
                message: 'Invalid email!',
            });
        }

        const validUser = await this.verifyUser(req.body.password, user.password);
        if (!validUser){
            return res.status(400).json({
                message: 'Invalid password!',
            });
        }

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

router.get('/test', (req, res) => res.json({ message: 'this is a message!' }));

module.exports = router;