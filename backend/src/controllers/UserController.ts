import client from '../database/postgres.js';
import { Request, Response, NextFunction } from 'express';

//
// SignUp Request Validation
//

//
// Insert User
//
export const signup = async (
  request: Request,
  response: Response
): Promise<Response> => {
  console.log('Inserting User');
  console.log(request.body);
  const sql = ` 
                INSERT INTO public.user(first_name, last_name, email, password, role)
                VALUES ('${request.body.first_name}', '${request.body.last_name}', '${request.body.email}', crypt('${request.body.password}', gen_salt('bf', 8)),'${request.body.role}');
              `;
  try {
    const a = await client.query(sql);
    console.log(a);
    return response.status(200).json({ message: 'signup successful' });
    //next();
  } catch (error) {
    console.log(error);
    //next(createError(500, `Could not query database: ${sql}`));
  }
};

/*
import client, { queryUserByMail } from '../database/postgres.js';
//import mailgun from 'mailgun-js';
import dotenv from 'dotenv';
import path from 'path';
import { isEmpty, generateToken, createError } from '../utils/utils.js';
import jwt from 'jsonwebtoken';


const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '/config/mailgun.env') });
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});
//
// Get All users from the Postgres Database
//
export const getUsers = async (request: Request, response: Response) => {
  client
    .query(`SELECT * FROM public.users`)
    .then((result) => {
      response.status(200).json(result.rows);
    })
    .catch((error) => {
      console.log(error);
      response
        .status(400)
        .json({ code: 'ERROR', message: 'Useres could be queried' });
    });
};

//
//  validate User
//
export const validateSignupUser = async (
  request: Request,
  response: Response,
  next
) => {
  if (
    isEmpty(request.body.email) ||
    isEmpty(request.body.first_name) ||
    isEmpty(request.body.last_name) ||
    isEmpty(request.body.password)
  ) {
    next(
      createError(
        500,
        'Email, password, first name and last_name field cannot be empty'
      )
    );
  }
  next();
};

//
// Check if User is already registered
//
export const lookUpUser = async (request, response, next) => {
  console.log('Looking up User');
  const sql = `SELECT * FROM public.users WHERe email = '${request.body.email}'`;
  try {
    const usersWithSameMail = await client.query(sql);
    if (usersWithSameMail.rows.length > 0) {
      return response
        .status(403)
        .json({ code: 'ERROR', message: 'Email is already registered' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(createError(500, `Could not query database: ${sql}`));
  }
};

//
// Insert User
//
export const insertUser = async (request, response, next) => {
  console.log('Inserting User');
  const sql = `
                INSERT INTO public.users(first_name, last_name, email, password)
                VALUES ('${request.body.first_name}', '${request.body.last_name}', '${request.body.email}', crypt('${request.body.password}', gen_salt('bf', 8)));
                `;
  try {
    await client.query(sql);
    next();
  } catch (error) {
    console.log(error);
    next(createError(500, `Could not query database: ${sql}`));
  }
};

//
// Insert Verification Token
//
export const insertVerificationToken = async (request, response, next) => {
  console.log('Inserting Verification Token');
  const token = await generateToken();
  const ids = await client.query(
    `SELECT id FROM public.users WHERE email = '${request.body.email}'`
  );
  const id = ids.rows[0].id;
  const sql = `
                INSERT INTO public.user_verification_token(id, token) 
                VALUES ('${id}', '${token}')
                ON CONFLICT (id) DO UPDATE 
                SET token = '${token}', updated_at = now();
                `;
  const queryParams = 'id=' + encodeURI(id) + '&token=' + encodeURI(token); // TODO refactor id out to single controller
  response.locals.VERIFICATION_URL = `http://localhost:8002/v1/user/verification?${queryParams}`;
  try {
    await client.query(sql);
    next();
  } catch (error) {
    console.log(error);
    next(createError(500, `Could not query database: ${sql}`));
  }
};

//
// Send Verification Email to User
//
export const sendVerificationEmailToUser = async (request, response, next) => {
  console.log('Sending verfication Email to User');
  try {
    const verificationURL = response.locals.VERIFICATION_URL;
    // sent mail with token to address
    const data = {
      from:
        'Defenders Undressed <mailgun@sandbox3911f17e38444668b1fc93d05d4eb4ff.mailgun.org>',
      to: 'defenders-undressed@protonmail.com',
      subject: 'Account Bestätigung',
      text: `Willkommen bei Defenders Undressed!\n\nUm die Registrierung abzuschliessen und deinen Account bei uns zu verifizieren,\nklicke bitte auf den untenstehenden Link.\n\n${verificationURL}\n\nDu kannst nun aktiv in unserer Community Beiträge kommentieren und bewerten.\n\nViele Grüsse\n\nDein Defenders Undressed Team`
    };
    await mg.messages().send(data);
    next();
  } catch (error) {
    console.log(error);
    next(createError(500, 'Could not send verification email'));
  }
};

//
//
//
export const registrationSuccessful = async (request, response, next) => {
  return response
    .status(200)
    .json({ code: 'INFO', message: 'User successfully registered' });
};

//
//
//
export const resendTokenSuccessful = async (request, response, next) => {
  return response
    .status(200)
    .json({ code: 'INFO', message: 'Token successfully resent' });
};

//
//  validate User before Token Comparison
//
export const validateVerificationUser = async (request, response, next) => {
  if (isEmpty(request.query.id.toString()) || isEmpty(request.query.token)) {
    next(createError(500, 'Email and id field cannot be empty'));
  }
  next();
};

//
//  Get User Token
//
export const getToken = async (request, response, next) => {
  console.log('Getting stored User Token');
  const sql = `SELECT token FROM public.user_verification_token WHERE id = '${request.query.id}'`;
  const id = isEmpty(request.query.id) ? '' : request.query.id;
  try {
    const tokenQuery = await client.query(sql);
    response.locals.STORED_TOKEN =
      tokenQuery.rows.length === 1 ? tokenQuery.rows[0].token : null;
    if (response.locals.STORED_TOKEN === null) {
      next(createError(404, `Token does not exist anymore`));
    }
    const queryParams =
      'id=' +
      encodeURI(id) +
      '&token=' +
      encodeURI(response.locals.STORED_TOKEN); // TODO refactor id out to single controller
    response.locals.VERIFICATION_URL = `http://localhost:8002/v1/user/verification?${queryParams}`;
    next();
  } catch (error) {
    console.log(error);
    next(createError(500, `Could not query database`));
  }
};

//
//  compare tokens
//
export const compareToken = async (request, response, next) => {
  const storedToken = response.locals.STORED_TOKEN;
  try {
    if (storedToken !== null && request.query.token === storedToken) {
      // change is_verified from false to true
      await client.query(
        `UPDATE public.users SET is_verified = NOT is_verified, updated_at=NOW() WHERE id = '${request.query.id}'`
      );
      await client.query(
        `DELETE FROM public.user_verification_token WHERE id = '${request.query.id}'`
      );
      return response
        .status(200)
        .json({ code: 'INFO', message: 'User successfully verified' });
    } else {
      return response
        .status(403)
        .json({ code: 'ERROR', message: 'Error while verifying the token' });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, `Could not query database`));
  }
};

//
// Delete User with a certain email address
//
export const deleteUser = async (request, response) => {
  const email = request.body.email;
  try {
    await client.query(`DELETE FROM public.users WHERE email = '${email}'`);
    //await client.query(`DELETE FROM public.verification_token WHERE email = '${email}'`);
    return response
      .status(200)
      .json({ code: 'INFO', message: 'User successfully deleted' });
  } catch (error) {
    console.log(error);
    return response
      .status(403)
      .json({ code: 'ERROR', message: 'User could not be deleted' });
  }
};

//
//  validate User before updating the password
//
export const validatePasswordData = async (request, response, next) => {
  if (
    isEmpty(request.body.email) ||
    isEmpty(request.body.old_password) ||
    isEmpty(request.body.new_password)
  ) {
    next(
      createError(500, 'Email, password and old_password field cannot be empty')
    );
  }
  next();
};

//
//
//
export const getPassword = async (request, response, next) => {
  const sql = `SELECT password FROM public.users WHERE email = '${request.body.email}'`;
  try {
    const passwordQuery = await client.query(sql);
    response.locals.OLD_PASSWORD =
      passwordQuery.rows.length === 1 ? passwordQuery.rows[0].token : null;
    if (response.locals.OLD_PASSWORD === null) {
      next(createError(404, `User or Password wrong`));
    }
    next();
    //return response.status(200).json({"code": "INFO", "message": "Password successfully updated"});
  } catch (error) {
    console.log(error);
    next(createError(500, `Could not query database`));
  }
};

//
//
//
export const comparePassword = async (request, response, next) => {
  if (response.locals.OLD_PASSWORD !== request.body.old_password) {
    next(createError(404, 'User or Password wrong'));
  }
  next();
};

//
//  validate User before Token Comparison
//
export const updatePassword = async (request, response, next) => {
  const sql = `UPDATE public.users SET password = '${request.body.new_password}', updated_at=NOW() WHERE email = '${request.body.email}'`;
  try {
    await client.query(sql);
    return response
      .status(200)
      .json({ code: 'INFO', message: 'Password successfully updated' });
  } catch (error) {
    console.log(error);
    next(createError(500, `Could not query database`));
  }
};

//
//
//
export const loginUser = async (request, response, next) => {
  const sql = `select * from public.users where email = '${request.body.email}' AND password = crypt('${request.body.password}', password)`;
  try {
    const passwordQuery = await client.query(sql);
    if (passwordQuery.rows.length === 1) {
      const token = jwt.sign(request.body.email, process.env.TOKEN_SECRET);
      console.log(token);
      response.cookie('JWT', token, {
        maxAge: 3600,
        httpOnly: true
      });
      return response
        .status(200)
        .json({ code: 'INFO', message: 'Password was correct' });
    } else {
      return response
        .status(401)
        .json({ code: 'INFO', message: 'Password was not correct' });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, `Could not query database`));
  }
};

//
//
//
export const authenticateToken = async (request, response, next) => {
  // Gather the jwt access token from the request header
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return request.sendStatus(401); // if there isn't any token

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);
      if (err) return request.sendStatus(403);
      request.user = user;
      next(); // pass the execution off to whatever request the client intended
    }
  );
};
*/
