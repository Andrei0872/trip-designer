const {JWT} = require('../token/jwt');
const bcrypt = require('bcrypt');
const database = require('../db');
const router = express.Router();

class UserController {

     async login(req, res){
        const user = await this.getUserByEmail(req.body.email);

        if (!user){
            return res.status(400).json({
                message: 'Invalid email!',
            });
        }

        const validUser = await this.verifyUser(req.body.password, user.password);
        if (!user){
            return res.status(400).json({
                message: 'Invalid password!',
            });
        }

        const token = JWT.createAccessToken({ id: user.id });
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
    
    async getUserByEmail(email: string){
        const SQL = `SELECT * FROM user WHERE user.email = '${email}'`; 
        const client = database.connect();
        try {
            const res = await database.client.query(SQL);
            return res;
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

    async verifyUser (candidatePassword:string, encryptedPass:any) {
        return bcrypt.compare(candidatePassword, encryptedPass);
    }
}

router.get('/', (req, res) => {
    const controller = new UserController();
    return controller.login(req, res);
});

module.exports = router;