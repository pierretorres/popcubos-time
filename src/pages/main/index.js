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

        const response = await api.get(`search/movie?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-BR&query=${this.state.search}&page=${myPage}`)
        console.log(response);
        const {results, ...movieInfo} = response.data
        this.setState({movieInfo});
        this.setState({page});
        
        if (page !== 1) {myPage = Math.floor(Number(page)/4.01) + 1;}

        console.log('page=' + page + ' e mypage='+myPage + ' e PAGE FUN='+page)
            
        // this.setState({movie: results});
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

   loadMovieGenre = async (page=1, genre) => {
    let myPage = 1;

        const response = await api.get(`discover/movie?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-BR&sort_by=popularity.desc&page=1&with_genres=${genre}`)
        console.log(response);
        const {results, ...movieInfo} = response.data
        this.setState({movieInfo});
        this.setState({page});
        
        if (page !== 1) {myPage = Math.floor(Number(page)/4.01) + 1;}

        console.log('page=' + page + ' e mypage='+myPage + ' e PAGE FUN='+page)
            
        // this.setState({movie: results});
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
              <article key={movie.id} >
                  <img src={'https://image.tmdb.org/t/p/w200' + movie.poster_path} alt="Logo" />
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
