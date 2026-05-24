import mongoose from 'mongoose';
import Movie from './schema/moviesSchema.js';


export const getAllMovies = async () => {
    const result = await Movie.find()
                                   .populate('producer','-_id -role')
                                   .populate('director','-_id -role')
                                   .populate('actors','-_id -role');

    if(!result){
        return [];
    }
    return result;
};

export const getSingleMovieById = async (movieId) => {
    if(!mongoose.Types.ObjectId.isValid(movieId)){
        console.log('This is not a correct movie Id, please provide a correct ID');
        return null;
    }
    const result = await Movie.findById(movieId)
                                                .populate('producer','-_id -role')
                                                .populate('director','-_id -role')
                                                .populate('actors','-_id -role');
    if(!result){
        console.log('This ID is not present');
        return null;
    }
    return result;
};

export const createMovieByName = async (movieObj) => {
    const newMovie = await Movie(movieObj);
    const result = await newMovie.save();
    return result;
};

export const updateMovieById = async (movieId,movieObj) => {
    if(!mongoose.Types.ObjectId.isValid(movieId)){
        console.log('This is not a correct movie ID, please provide a correct ID');
        return null;
    }
    const result = await Movie.findByIdAndUpdate(movieId,movieObj,{new:true});
    if(!result){
        console.log('Something went wrong!.. This ID is not present');
        return null;
    };
    return result;
};

export const deleteMovieById = async (movieId) => {
    if(!mongoose.Types.ObjectId.isValid(movieId)){
        console.log('This is not a movie ID, please provide a correct movie ID');
        return false;
    }
    const result = await Movie.findByIdAndDelete(movieId);
    if(!result){
        console.log('Something went wrong!.. This ID is not present');
        return false;
    }
    return true;
};