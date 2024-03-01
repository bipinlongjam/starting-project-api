import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  const {title, releaseDate, openingText, onDelete} = props;

  const deleteHandler = () =>{
    onDelete(props.id)
    console.log("click delete")
  }
  return (
    <li className={classes.movie}>
      <div>
      <h2>{title}</h2>
      <h3>{releaseDate}</h3>
      <p>{openingText}</p>
      </div>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
};

export default Movie;
