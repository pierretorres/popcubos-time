import React, {Component} from 'react';
import api from '../../services/api';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            movieInfo:{},
            page: 1,
            search: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({search: event.target.value});
      }
    
      handleSubmit(event) {
        this.loadMovie();
        event.preventDefault();
      }

    componentDidMount(){
    //    this.loadMovie();
   }
   loadMovie = async (page = 1) => {
    const response = await api.get(`movie?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-BR&query=${this.state.search}&page=${page}`)
    console.log(response);
    const {results, ...movieInfo} = response.data

    this.setState({ movie: results, movieInfo, page});
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
       <form onSubmit={this.handleSubmit}>
           <input type="text" value={this.state.value} onChange={this.handleChange} />
       </form>
       
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
            <button id="button1" onClick={this.pageOne} value={Number(this.state.page) - 2}>{Number(this.state.page) - 2}</button>
            <button id="button2" onClick={this.pageTwo} value={Number(this.state.page) - 1}>{Number(this.state.page) - 1}</button>
            <button id="button3" onClick={this.pageThree}value={Number(this.state.page)}>{Number(this.state.page)}</button>
            <button id="button4" onClick={this.pageFour}value={Number(this.state.page) + 1}>{Number(this.state.page) + 1}</button>
            <button id="button5" onClick={this.pageFive}value={Number(this.state.page) + 2}>{Number(this.state.page) + 2}</button>
       </div>
        );
    }
}

// Se a pagina atual == 1 -> não mostra botão 1 e 2
// Se a pagina atual == 2 -> não mostra botão 1 

// Se a pagina atual == total_pages -> não mostra botão 4 e 5
// Se a pagina atual == total_pages-1 -> não mostra botão 5
