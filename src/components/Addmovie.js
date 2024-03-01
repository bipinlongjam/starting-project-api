import React,{useState} from 'react'
import classes from './Addmovie.module.css'

const Addmovie = ({ onAddMovie }) => {
  
    const [title, setTitle] = useState('');
    const [openingText, setOpeningText] = useState('');
    const [releaseDate, setReleaseDate] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    const movieData = {
      title,
      openingText,
      releaseDate
    };

    onAddMovie(movieData);

    // Clear form fields after submission
    setTitle('');
    setOpeningText('');
    setReleaseDate('');
  };

  return (
    <form className={classes['form-container']}onSubmit={submitHandler}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Opening Text:</label>
        <textarea
          rows="5"
          value={openingText}
          onChange={(event) => setOpeningText(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Release Date:</label>
        <input
          type="date"
          value={releaseDate}
          onChange={(event) => setReleaseDate(event.target.value)}
          required
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default Addmovie