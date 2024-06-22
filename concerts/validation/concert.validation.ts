import { body } from 'express-validator';

export const createConcertRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a numeric value')
];

export const buyTicketRules = [
    body('quantity').isNumeric().withMessage('Quantitiy must have numeric value')
];
