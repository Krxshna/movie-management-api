import express from 'express';
import {
  getParticipants,
  createParticipant,
  getParticipantById,
  updateParticipant,
  deleteParticipant
} from '../services/participantService.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkPermission } from '../middlewares/roleMiddleware.js';
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware.js';
import { PARTICIPANTS_ROLE } from '../constants.js';
import { body } from 'express-validator';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

const validateParticipantData = [
  body('name').isString().trim().notEmpty().withMessage('Name is required'),
  body('age').isInt({min:0}).withMessage('Age must be a positive number'),
  body('role').isIn(PARTICIPANTS_ROLE).withMessage('Invalid role')
];

router.get('/',rateLimiter, getParticipants);
router.get('/:id',rateLimiter, getParticipantById);
router.post('/', authMiddleware,validateParticipantData,handleValidationErrors,checkPermission('create'), createParticipant);
router.put(
  '/:id',
  authMiddleware,
  validateParticipantData,
  handleValidationErrors,
  checkPermission('update'),
  updateParticipant
);
router.delete(
  '/:id',
  authMiddleware,
  checkPermission('delete'),
  deleteParticipant
);


export default router;
