import React,{Component} from 'react'
import api from '../../services/api'
import YouTube from 'react-youtube';
let i = [1,2,3]
export default class Movies extends Component {

    state = {
        movie: [],
        trailer: {},
        language: {},
        convert:{}
    };

    async componentDidMount(){
        const { id } = this.props.match.params;
        const response = await api.get(`movie/${id}?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-BR`);
        const responseVideo = await api.get(`movie/${id}/videos?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-BR`);        
        console.log(response)
        this.setState({movie: response.data});
        this.setState({language: response.data.spoken_languages[0]});
        this.setState({trailer: responseVideo.data.results[0]});
        this.setState({convert: this.convert(this.state.movie.status, this.state.language.name, this.state.movie.runtime, this.state.movie.release_date)});


        console.log(this.state.movie.genres[0].name)
        // console.log(this.convert(this.state.movie.status, this.state.language.name, this.state.movie.runtime, this.state.movie.release_date).data)
        
    }
    convert(status, language, runtime, date){
        let  idioma, situacao, duracao, data;
        switch (language) {
            case "English":  idioma = "Inglês" 
                break;
            case "Español":  idioma = "Espanhol" 
                break;
            case "普通话":  idioma = "Mandarim" 
                break;
            case "Polski":  idioma = "Polonês" 
            break;
            case "Deutsch":  idioma = "Alemão" 
                break; 
            case "العر":  idioma = "Árabe" 
                break; 
            case "한국어/조선말":  idioma = "Coreano" 
                break; 
            case "Français":  idioma = "Francês" 
                break; 
                    default:  idioma = language;
                break;
        }

        switch (status) {
            case "Post Production": situacao = "Em produção"
                break;
            case "Released": situacao = "Lançado"
                break;
        
            default:
                break;
        }
        let hora = Math.floor(Number(runtime)/60);
        let min = Math.floor(Number(runtime)%60);
        duracao = hora+"h "+min+"min"
        console.log( duracao)

        let dia  = date.split("-")[2];
        let mes  = date.split("-")[1];
        let ano  = date.split("-")[0];

        data = dia + '/' + ("0"+mes).slice(-2) + '/' + ("0"+ano).slice(-4);

        console.log( data)

        return {idioma: idioma, situacao: situacao, duracao: duracao, data: data}

    }
    render(){
        const { movie }= this.state;     
        const { convert }= this.state;     
        const { trailer }= this.state;  
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
          }; 
        return(
            
            <div className="movie-info">
            
                <h2>{movie.title}</h2>
                <h2>{movie.vote_average*10 + '%'}</h2>
                <h3>{convert.data}</h3>
                <p>{movie.overview}</p>
                <p>{convert.situacao}</p> 
                <p>{convert.idioma}</p> 
                <p>{convert.duracao}</p> 
                <p>{"$"+Number(movie.budget).toLocaleString('pt-BR') + ",00"}</p> 
                <p>{"$"+Number(movie.revenue).toLocaleString('pt-BR') + ",00"}</p>
                <p>{"$"+((movie.revenue)-(movie.budget)).toLocaleString('pt-BR') + ",00"}</p>
                

                <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="Logo" />
           
                
                <YouTube
                videoId={this.trailer()}
                opts={opts}
                onReady={this._onReady}
                />
            </div>
        );
    }
    trailer() {
        let i = this.state.trailer.key
        return i
    }
    _onReady(event) {
        event.target.pauseVideo();
    }
}