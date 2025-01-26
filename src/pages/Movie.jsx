import axios, {isCancel, AxiosError} from 'axios';
import { useEffect, useState } from 'react';


function Movie() {
    const [movieData, setMovieData] = useState(null)
    const [state, setState] = useState({
        value: null
    })

    let API_TOKEN = import.meta.env.VITE_API_TOKEN;
    let API_KEY = import.meta.env.VITE_API_KEY;

    const getMovieData = () => {
        let query = 'Dragon Ball';

        if(state.value != null){
            query = state.value;
        }

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        axios
            .request(options)
            .then(res => {
                let results = res.data.results;
                    setMovieData(results);
            })
            .catch(err => console.error(err));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getMovieData();
    };

    const handleChange = (event) => {
        setState({value: event.target.value});
    };

    useEffect(() => {
        getMovieData()
    }, []);

    return (
      <>
        <div className='movie-container'>
            <h1>Movie Search: Deluxe React Edition</h1>
            <form className='movieInput' onSubmit={handleSubmit}>
                <input type="text" value={state.value} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>

            {movieData && movieData.length > 0 ? (
                <div className="movies-grid">
                    {movieData.map((movie, index) => (
                        <div className="movie-card" key={index}>
                            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <p className="movie-title">{movie.title}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No Movies Found</p>
            )}
        </div>
      </>
    )
};
  
  export default Movie