import { body } from 'express-validator';

export const registrationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
];

export const loginRules = [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
];