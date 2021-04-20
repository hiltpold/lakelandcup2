/*
import crypto from 'crypto';

interface ErrorWithStatus extends Error {
  status: number;
}

export const createError = (status: number, message: string) => {
  const error = new Error(message) as ErrorWithStatus;
  error.status = status;
  return error;
};

export const generateToken = async () => {
  const buffer = await crypto.randomBytes(48);
  return buffer.toString('hex');
};

export const isEmpty = (input: string) => {
  if (input === undefined || input === '' || input.replace(/\s/g, '') === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  }
  return true;
};

export const createEmailText = () => {};
*/
