import { query, param, validationResult } from 'express-validator';

export const validate_query = [
  query('name').optional().isString().trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validate_route_param_id = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];