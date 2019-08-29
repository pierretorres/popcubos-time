import React, {Component} from 'react';
import api from '../../services/api';


export default class Main extends Component {

    state = {
        movie: [],
        movieInfo:{},
        page: 1
    };
  
    componentDidMount(){
       this.loadMovie();
   }
   loadMovie = async (page = 1) => {
    const response = await api.get(`/popular?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-br&page=${page}`)
    console.log(response);
    const {results, ...movieInfo} = response.data

    this.setState({ movie: results, movieInfo});
   };

    pageOne = (id) => { 
       let clickedPage = document.getElementById (id.target.id).value
            console.log(clickedPage)
            this.loadMovie(clickedPage)
    }
    pageTwo = (id) => {
        let clickedPage = document.getElementById (id.target.id).value
            console.log(clickedPage)
            this.loadMovie(clickedPage)
    }
    pageThree = (id) => { 
        let clickedPage = document.getElementById (id.target.id).value
            console.log(clickedPage)
            this.loadMovie(clickedPage)
    }
    pageFour = (id) => { 
        let clickedPage = document.getElementById (id.target.id).value
            console.log(clickedPage)
            this.loadMovie(clickedPage)
    }
    pageFive = (id) => {
        let clickedPage = document.getElementById (id.target.id).value
            console.log(clickedPage)
            this.loadMovie(clickedPage)
    }
   
    render(){
        const { movie } = this.state;
        return(
       <div className="movie-list">
            {movie.map( movie =>(
               

              <article key={movie.id}>
                  {/* <img src={'https://image.tmdb.org/t/p/w200' + movie.poster_path} alt="Logo" /> */}
                  <h2>{movie.title}</h2>
                  <h2>{movie.vote_average*10 + '%'}</h2>
                  <h3>{movie.release_date}</h3>
                  <p>{movie.overview}</p>
                  {/* <p>{movie.genre_ids + ""}</p> */}

              </article>
            ))}
            <button id="button1" onClick={this.pageOne} value={this.state.page - 2}>{this.state.page - 2}</button>
            <button id="button2" onClick={this.pageTwo} value={this.state.page - 1}>{this.state.page - 1}</button>
            <button id="button3" onClick={this.pageThree}value={this.state.page}>{this.state.page}</button>
            <button id="button4" onClick={this.pageFour}value={this.state.page + 1}>{this.state.page + 1}</button>
            <button id="button5" onClick={this.pageFive}value={this.state.page + 2}>{this.state.page + 2}</button>
       </div>
        );
    }
}

// Se a pagina atual == 1 -> não mostra botão 1 e 2
// Se a pagina atual == 2 -> não mostra botão 1 

// Se a pagina atual == total_pages -> não mostra botão 4 e 5
// Se a pagina atual == total_pages-1 -> não mostra botão 5
