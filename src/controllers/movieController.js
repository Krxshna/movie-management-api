import express from 'express';

import {getMovies,
        getMovieById,
        createMovie,
        updateMovie,
        deleteMovie} from '../services/moviesService.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkPermission } from '../middlewares/roleMiddleware.js';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware.js';
import { MOVIE_GENRE } from '../constants.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

const validateMovieData = [
    body('movieName').isString().trim().notEmpty().withMessage('Movie name is required'),
    body('movieDescription').isString().trim().notEmpty().withMessage('Movie description required'),
    body('movieDuration').isInt({min:0}).withMessage('Duration must be a positive integer'),
    body('movieRating').isFloat({ min: 0.0, max: 10.0 }).withMessage('Rating should be between 0 to 10'),
    body('genre').isIn(MOVIE_GENRE).withMessage('Invalid movie genre')
];

router.get('/',rateLimiter,getMovies);
router.get('/:id', rateLimiter,getMovieById);
router.post(
  '/',
  authMiddleware,
  validateMovieData,
  handleValidationErrors,
  checkPermission('create'),
  createMovie
);
router.put(
  '/:id',
  authMiddleware,
  validateMovieData,
  handleValidationErrors,
  checkPermission('update'),
  updateMovie
);
router.delete('/:id', authMiddleware, checkPermission('delete'), deleteMovie);


export default router;
