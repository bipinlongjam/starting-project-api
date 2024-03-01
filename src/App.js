import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Addmovie from './components/Addmovie';

function App() {
 const [movies, setMovies] = useState([])
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
    
      setMovies(loadedMovies)
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
      // Update the movies state by filtering out the deleted movie
      setMovies(prevMovies => prevMovies.filter(m => m.id !== id));
      console.log("click delete handler", id)
    } catch (error) {
      setError(error.message);
    }
  };
  
  
  let content = <p>Found no movies</p>
  if(movies.length > 0){
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler}  />
  }
  if(error) {
    content = <p>{error}</p>
  }
  if(isLoading){
    content = <p>Loading...</p>
  }
  

     async function addMovieHandler(movies) {
      try{
        const response = await fetch('https://movielist-1685e-default-rtdb.firebaseio.com/movies.json',{
            method:'POST',
            body: JSON.stringify(movies),
            headers:{
              'Content-Type' : 'application/json'
            }
          })
          if(!response.ok){
            throw new Error('Failed to add movie')
          }
          const data = await response.json();
          console.log(data)
          setMovies(prevMovies => [...prevMovies, {id: data.name, ...movies}]);
      }catch(error){
        setError(error.message)
      } 
        }

  return (
    <React.Fragment>
      <section>
      <Addmovie onAddMovie={addMovieHandler} />
      <br></br>
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
