import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom'
import'./Style.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            movieInfo:{},
            page: 1,
            search: '',
            navegation0: 1,
            navegation1: 1,
            navegation2: 1
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({search: event.target.value});
        this.handleSubmit(event);
       
      }
    
      handleSubmit(event) {
        switch ((this.state.search).toLowerCase()) {
            case 'ação': this.loadMovieGenre(1, 28); break;
            case 'aventura': this.loadMovieGenre(1, 12); break;
            case 'animação': this.loadMovieGenre(1, 16); break;
            case 'comédia': this.loadMovieGenre(1, 35); break;
            case 'crime': this.loadMovieGenre(1, 80); break;
            case 'documentário': this.loadMovieGenre(1, 90); break;
            case 'drama': this.loadMovieGenre(1, 18); break;
            case 'família': this.loadMovieGenre(1, 10751); break;
            case 'fantasia': this.loadMovieGenre(1, 14); break;
            case 'história': this.loadMovieGenre(1, 36); break;
            case 'terror': this.loadMovieGenre(1, 27); break;
            case 'música': this.loadMovieGenre(1, 10402); break;
            case 'mistério': this.loadMovieGenre(1, 9648); break;
            case 'romance': this.loadMovieGenre(1, 10749); break;
            case 'ficção científica': this.loadMovieGenre(1, 878);break; 
            case 'cinema TV': this.loadMovieGenre(1, 10770); break;
            case 'thriller': this.loadMovieGenre(1, 53); break;
            case 'guerra': this.loadMovieGenre(1, 10752); break;
            case 'faroeste': this.loadMovieGenre(1, 37); break;
                
        
            default: this.loadMovie();
                break;
        }
        event.preventDefault();
      }

    componentDidMount(){
    //    this.loadMovie();
   }

   loadMovie = async (page=1) => {
    let myPage = 1;
   
    if (page !== 1) {myPage = Math.floor(Number(page)/4.0001) + 1;}
        const response = await api.get(`search/movie?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-BR&query=${this.state.search}&page=${myPage}`)
        const {results, ...movieInfo} = response.data
        this.setState({movieInfo});
        this.setState({page});
        let i;
        if (myPage === 1) {
            i = (Number(page)-1)*5 
        }else{
            i = ((Number(page)-1)*5)-((myPage-1)*20)
        }
        if (this.state.movieInfo.total_results>4) {
            this.setState({movie: [
                results[i],
                results[i+1],
                results[i+2],
                results[i+3],
                results[i+4]
            ]});
        }else{
            this.setState({movie: results});
        }
            
        switch (this.state.page) {
            case (this.state.movieInfo.total_pages)*4: this.navPage2();
                break;
            case (this.state.movieInfo.total_pages)*4+1: this.navPage2();
                break;
            case (this.state.movieInfo.total_pages)*4+2: this.navPage2();
                break;
            case (this.state.movieInfo.total_pages)*4+3: this.navPage2();
                break;

               
        
            default: this.setState({navegation1:3});

                break;
        }
        switch (this.state.page) {
            case (this.state.movieInfo.total_pages)*4+1: this.navPage1();
                break;
            case (this.state.movieInfo.total_pages)*4+2: this.navPage1();
                break;
            case (this.state.movieInfo.total_pages)*4+3: this.navPage1();
                break;
            case (this.state.movieInfo.total_pages)*4+4: this.navPage1();
                break;
        
            default: 
            this.setState({navegation2:3});

                break;
        }
       
        this.setState({navegation0: 0});
        

   };

   loadMovieGenre = async (page=1, genre) => {
   
    let myPage = 1;

        const response = await api.get(`discover/movie?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-BR&sort_by=popularity.desc&page=1&with_genres=${genre}`)
        const {results, ...movieInfo} = response.data
        this.setState({movieInfo});
        this.setState({page});
        
        if (page !== 1) {myPage = Math.floor(Number(page)/4.01) + 1;}
            
        let i;
        if (myPage === 1) {
            i = (Number(page)-1)*5 
        }else{
            i = ((Number(page)-1)*5)-((myPage-1)*20)
        }
        
            this.setState({movie: [
                results[i],
                results[i+1],
                results[i+2],
                results[i+3],
                results[i+4]
            ]});
   };

    pageOne = (id) => { 
       let clickedPage = document.getElementById (id.target.id).value
            this.loadMovie(clickedPage)
    }
    pageTwo = (id) => {
        let clickedPage = document.getElementById (id.target.id).value
            this.loadMovie(clickedPage)
    }
    pageThree = (id) => { 
        let clickedPage = document.getElementById (id.target.id).value
            this.loadMovie(clickedPage)
    }
    pageFour = (id) => { 
        let clickedPage = document.getElementById (id.target.id).value
            this.loadMovie(clickedPage)
            
    }
    pageFive = (id) => {
        let clickedPage = document.getElementById (id.target.id).value
            this.loadMovie(clickedPage)
    }
    convert(date){
      if(date === undefined){
          return "Sem data"
      }else{

        let dia  = date.split("-")[2];
        let mes  = date.split("-")[1];
        let ano  = date.split("-")[0];

       let data = dia + '/' + ("0"+mes).slice(-2) + '/' + ("0"+ano).slice(-4);


        return data;
      }

    }
    navPage2(){
        this.setState({navegation1:1});
        this.setState({navegation2: 1});

    }
    navPage1(){
        this.setState({navegation2: 1});
    }
    render(){
        
        const { movie } = this.state;
        return(
            
       <div className="movie-list">
       <form onSubmit={this.handleSubmit}>
           <input type="text" value={this.state.value} onChange={this.handleChange} id="search" placeholder="Busque um filme por nome ou gênero..."/>
       </form>
       <div className="listContainer">
            {movie.map( movie =>(
                <Link  to={`/movies/${movie.id}`} >
                    <div className="cardContainer" key={movie.id} >
                        <div className="cardContainerMovie">
                            <div className="cardContainerPoster">
                            <img className="cardBackdrop" src={'https://image.tmdb.org/t/p/w780' + movie.backdrop_path} alt="Logo" />
                                <img className="cardPoster" src={'https://image.tmdb.org/t/p/original' + movie.poster_path} alt="Logo" />
                            </div>  
                            <div className="cardContainerInfo">
                                <h2  className="cardTitle">{movie.title}</h2>
                                <div className="cardContainerRating">
                                    <p  className="cardRating">{movie.vote_average*10 + '%'}</p>
                                </div>
                                <p  className="cardDate">{this.convert(movie.release_date)}</p>
                                <p  className="cardOverview">{movie.overview}</p>
                            </div>
                            </div>
                        </div>
                </Link>
              
            ))}
            </div>
            <ul className="PageButtons">
            <li className={"btn"+ this.state.page}id="button1" onClick={this.pageOne} value={Number(this.state.page) - 2}>{Number(this.state.page) - 2}</li>
            <li className={"btn"+ (Number(this.state.page)+1)} id="button2" onClick={this.pageTwo} value={Number(this.state.page) - 1}>{Number(this.state.page) - 1}</li>
            <span className={"btn"+ this.state.navegation0}>
            <li className={"btn"+ this.state.navegation0}id="button3" onClick={this.pageThree}value={Number(this.state.page)}>{Number(this.state.page) }</li>
             </span>
            <li className={"btn"+ this.state.navegation2} id="button4" onClick={this.pageFour}value={Number(this.state.page) + 1}>{Number(this.state.page) + 1}</li>
            <li className={"btn"+ this.state.navegation1} id="button5" onClick={this.pageFive}value={Number(this.state.page) + 2}>{Number(this.state.page) + 2}</li>
            </ul>
       </div>
        );
    }
}


// Desenvolvido por Pierre Torres
// github.com/pierretorres