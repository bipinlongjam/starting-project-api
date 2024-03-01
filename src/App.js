import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
 const [movie, setMovie] = useState([])
 const [isLoading, setIsLoading] = useState([])

  async function fetchMoviehandler(){
    setIsLoading(true)
   const response = await fetch('https://swapi.dev/api/films/')
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
      setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movie.length > 0 && <MoviesList movies={movie} />}
        {!isLoading && movie.length === 0 && <p>Found no movie</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
