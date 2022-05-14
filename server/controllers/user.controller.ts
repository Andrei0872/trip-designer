const userService = require('../services/User.service');
const {JWT} = require('../token/jwt');

class UserController {
     userService: any;

     constructor (userService: any){
         this.userService = userService;
     }

     async login(req, res){
        const user = await this.userService.getUserByEmail(req.body.email);

        if (!user){
            return res.status(400).json({
                message: 'Invalid email!',
            });
        }

        const validUser = await this.userService.verifyUser(req.body.password, user.password);
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
}

module.exports = new UserController(userService);