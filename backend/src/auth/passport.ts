import passport from 'passport';
import passportLocal from 'passport-local';
import client from '../database/postgres.js';
import { QueryResult } from 'pg';
import { Request, Response, NextFunction } from 'express';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id, done) => {
  client
    .query(`SELECT * FROM users WHERE id = ${id}`)
    .then((result: QueryResult) => {
      return done(null, result.rows[0]);
    })
    .catch((error: Error) => {
      return done(error);
    });
});

//setting up our local strategy
passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {
      client
        .query(
          `SELECT id, email, password from public.user where email='${email}' AND password = crypt('${password}', password)`
        )
        .then((result: QueryResult) => {
          if (result.rows.length > 0) {
            done(null, result.rows[0]);
          } else {
            done(null, false, { message: '' });
          }
        })
        .catch((error: Error) => {
          done(error);
        });
    }
  )
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
