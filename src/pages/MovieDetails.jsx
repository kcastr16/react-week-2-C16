import axios, {isCancel, AxiosError} from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../src/App.css'


function MovieData() {

    const [movieDetails, setMovieDetails] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const movieId = queryParams.get('id');


    //Api credentials
    let API_TOKEN = import.meta.env.VITE_API_TOKEN;
    let API_KEY = import.meta.env.VITE_API_KEY;


    function getMovieData() {

        const details = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}&api_key=${API_KEY}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        axios
        .request(details)
        .then(res => {
            let results = res.data;
            console.log(results)
            setMovieDetails(results)
        })
        .catch(err => console.error(err));
    }

    


    useEffect(() => {
        getMovieData();
    }, []);

    return (
        <>
            <div className='movie-details-cont'>
                {movieDetails ? (
                    <>
                        <div className='movie-details-txt'>
                        <h1>{movieDetails.title}</h1>
                        <p>{movieDetails.overview}</p>
                        <p>Country of Origin: {movieDetails.origin_country}</p>
                        <p>Genres: {movieDetails.genres[1].name}</p>
                        </div>
                        <img className="movie-details-poster" src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
                        
                    </>
                    
                    
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default MovieData