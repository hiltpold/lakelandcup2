//import { Pool } from 'pg';
import Client from 'pg';
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '/config/postgres.env') });

const client = new Client.Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.PGHOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.PGPORT)
});

/*
//
// Get a single users from the Postgres Database
//
export const queryUserByMail = (email: string) => {
  return client
    .query(`SELECT * FROM public.users WHERE email=${email}`)
    .catch((error) => console.log(error));
};
*/
export default client;
