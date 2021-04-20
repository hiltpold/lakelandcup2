import { NextFunction, Router } from 'express';
import { signup } from '../controllers/UserController.js';
import {
  validateSignUpUser,
  validateLoginUser,
  validate
} from '../validators/UserValidator.js';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { User } from '../models/user.js';
import '../auth/passport.js';
import { Request, Response } from 'express';

const router = Router();

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (err: Error, user: User, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }
      console.log(user, info);

      if (!user) {
        console.error(info.message);
        res.status(401).send(info.message);
      }
      req.logIn(user, (err: Error) => {
        if (err) {
          return next(err);
        }
        res.status(200).send({
          message: 'user found & logged in'
        });
      });
    }
  )(req, res, next);
};

router.post('/api/v1/user/signup', validateSignUpUser(), validate, signup);
router.post('/api/v1/user/login', validateLoginUser(), validate, login);

export default router;
/*
import {
  deleteUser,
  validateSignupUser,
  validateVerificationUser,
  validatePasswordData,
  lookUpUser,
  insertUser,
  insertVerificationToken,
  sendVerificationEmailToUser,
  registrationSuccessful,
  resendTokenSuccessful,
  getToken,
  compareToken,
  getPassword,
  comparePassword,
  updatePassword,
  loginUser
} from '../controllers/UsersController.js';


const router = Router();
router.post('/v1/user/delete', deleteUser);
router.post(
  '/v1/user/signup',
  validateSignupUser,
  lookUpUser,
  insertUser,
  insertVerificationToken,
  sendVerificationEmailToUser,
  registrationSuccessful
);
router.get(
  '/v1/user/verification',
  validateVerificationUser,
  getToken,
  compareToken
);
router.get(
  '/v1/user/verification/token/resend',
  getToken,
  sendVerificationEmailToUser,
  resendTokenSuccessful
);

// should only be done when logged in with http only cookie active
router.post(
  '/v1/user/password/change',
  validatePasswordData,
  getPassword,
  comparePassword,
  updatePassword
);
//router.post("/v1/user/verification/send", lookUpUser);
router.post('/v1/user/login', loginUser);

//router.post("/v1/user/password/reset", );

export default router;
*/
