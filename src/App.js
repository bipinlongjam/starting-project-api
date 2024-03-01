import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Addmovie from './components/Addmovie';

function App() {
 const [movie, setMovie] = useState([])
 const [isLoading, setIsLoading] = useState([])
 const [error, setError] = useState(null)
 
  const fetchMoviehandler = useCallback( async () => {
    setIsLoading(true);
    setError(null)
    try{
      const response = await fetch('https://swapi.dev/api/films/')
      
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const data =  await response.json();
      const transformedMovies = data.results.map(movieData =>{
        return {
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      })
      setMovie(transformedMovies)
    }catch(error){
      setError(error.message)
    }
    setIsLoading(false)
  },[])
  
  useEffect(()=>{
    fetchMoviehandler()
  },[fetchMoviehandler])

  let content = <p>Found no movies</p>
  if(movie.length > 0){
    content = <MoviesList movies={movie} />
  }
  if(error) {
    content = <p>{error}</p>
  }
  if(isLoading){
    content = <p>Loading...</p>
  }
  
  const addMovieHandler = (movieData) => {
    // Logic to add the movie to the list
    setMovie(prevMovies => [...prevMovies, movieData]);
    console.log('Added Movie:', movieData);
};


  return (
    <React.Fragment>
      <section>
      <Addmovie onAddMovie={addMovieHandler} />
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movie.length > 0 && }
        {!isLoading && movie.length === 0 && <p>Found no movie</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
