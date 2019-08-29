import React, {Component} from 'react';
import api from '../../services/api';

export default class Main extends Component {

    state = {
        movie: []
    };
  
    componentDidMount(){
       this.loadMovie();
   }
   loadMovie = async () => {
    const response = await api.get()

    this.setState({ movie: response.data.results});
   };
   
    render(){
        const { movie } = this.state;
        return(
       <div className="movie-list">
            {movie.map( movie =>(
               

              <article key={movie.id}>
                  <img src={'https://image.tmdb.org/t/p/w200' + movie.poster_path} alt="Logo" />
                  <h2>{movie.title}</h2>
                  <h2>{movie.vote_average*10 + '%'}</h2>
                  <h3>{movie.release_date}</h3>
                  <p>{movie.overview}</p>
                  {/* <p>{movie.genre_ids + ""}</p> */}

              </article>
            ))}
       </div>
        );
    }
}