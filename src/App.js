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
      const response = await fetch('https://movielist-1685e-default-rtdb.firebaseio.com/movies.json')
      
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const data =  await response.json();

      const loadedMovies = [];

      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
    
      setMovie(loadedMovies)
    }catch(error){
      setError(error.message)
    }
    setIsLoading(false)
  },[])
  
  useEffect(()=>{
    fetchMoviehandler()
  },[fetchMoviehandler])

  const deleteMovieHandler = async (id) => {
    try {
      const response = await fetch(`https://movielist-1685e-default-rtdb.firebaseio.com/movies/${id}.json`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      // Remove the deleted movie from the movies state
      setMovie(prevMovies => prevMovies.filter(movie => movie.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };
  
  let content = <p>Found no movies</p>
  if(movie.length > 0){
    content = <MoviesList movies={movie} onDeleteMovie={deleteMovieHandler}  />
  }
  if(error) {
    content = <p>{error}</p>
  }
  if(isLoading){
    content = <p>Loading...</p>
  }
  

     async function addMovieHandler(movie) {
         const response = await fetch('https://movielist-1685e-default-rtdb.firebaseio.com/movies.json',{
            method:'POST',
            body: JSON.stringify(movie),
            headers:{
              'Content-Type' : 'application/json'
            }
          })
          const data = await response.json();
          console.log(data)
        }

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
