import { getAllMovies,getSingleMovieById,createMovieByName,updateMovieById,deleteMovieById } from '../repositories/moviesRepository.js';

import { getDataFromRedis,setDataToRedis,invalidKey } from '../lib/redisHelper.js';
import { validationResult } from 'express-validator';

const REDIS_KEY = 'movies';
const REDIS_CACHE = 3600;

export const getMovies = async (req,res) => {
    const resultFromRedis = await getDataFromRedis(REDIS_KEY);
    if(resultFromRedis){
        console.log('Found movies data from Redis');
        res.status(200).json(resultFromRedis);
        return;
    }
    const result = await getAllMovies();
    console.log('Found data from Database');
    await setDataToRedis(REDIS_KEY,result,REDIS_CACHE);
    res.status(200).json(result);
};

export const getMovieById = async (req,res) => {
    const id = req?.params?.id ?? '';
    const resultFromRedis = await getDataFromRedis(REDIS_KEY);
    if(resultFromRedis){
        console.log('Found data from Redis',resultFromRedis);
        const movie = resultFromRedis?.find(result => result.id === id);
        res.status(200).json(movie);
        return;
    }
    const result = await getSingleMovieById(id);
    if(!result){
        return null;
    }
    console.log('Found movie from Database');
    await setDataToRedis(REDIS_KEY,result,REDIS_CACHE);
    res.status(200).json(result);
};

export const createMovie = async (req,res) => {
    const movieObj = req?.body ?? {};
    const result = await createMovieByName(movieObj);
    await invalidKey(REDIS_KEY);
    res.status(201).json(result);
};

export const updateMovie = async (req,res) => {
    const id = req?.params?.id ?? '';
    const movieObj = req?.body ?? {};
    const result = await updateMovieById(id,movieObj);
    if(!result){
        console.log('The movie id not found');
        res.status(404).json({message:'The movie id not found'});
        return;
    }
    await invalidKey(REDIS_KEY);
    res.status(200).json(result);
};

export const deleteMovie = async (req,res) => {
    const id = req?.params?.id ?? '';
    const movie = await deleteMovieById(id);
    if(!movie){
        res.status(404).json({message: 'movie not found'});
        return;
    }
    await invalidKey(REDIS_KEY);
    res.status(204).json();
};