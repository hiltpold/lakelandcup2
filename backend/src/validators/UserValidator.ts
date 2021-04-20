import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateSignUpUser = () => {
  return [
    check('first_name').trim().escape(),
    check('last_name').trim().escape(),
    check('email', 'Email is not valid')
      .isEmail()
      .trim()
      .escape()
      .normalizeEmail(),
    check('password').isLength({ min: 5 }),
    check('role').trim().escape()
  ];
};

export const validateLoginUser = () => {
  return [
    check('email', 'Email is not valid')
      .isEmail()
      .trim()
      .escape()
      .normalizeEmail(),
    check('password').isLength({ min: 5 })
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Record<string, string>[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};
