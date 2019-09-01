import React,{Component} from 'react'
import api from '../../services/api'
import YouTube from 'react-youtube';
import './Style.css';
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
        const opts = {
            height: '500',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
          }; 
        return(
            
            <div className="movieContainer">
                    <div className="movieContainerDados">
                    <div className="movieContainerTitle">
                        <h2 className="movieTitle">{movie.title}</h2>
                        <p className="movieData">{convert.data}</p>
                        </div>
                        
                        <div className="movieContainerInfo">
                        <div className="movieBackdrop">
                        <img className="movieBackdrop" src={'https://image.tmdb.org/t/p/w780' + movie.backdrop_path} alt="Logo" />
                        </div>
                        <div className="movieContainerDetail">
                        <h3 className="movieInfoTitle">Sinopse</h3>
                        <hr className="movieLine"></hr>
                        <p className="movieOverview">{movie.overview}</p>
                        <h3 className="movieInfoTitle">Informações</h3>
                        <hr className="movieLine"></hr>
                        <table className="movieContainerTable">
                            <ul>
                                <li className="movieInfoTable">Situação</li>
                                <li className="movieInfoData">{convert.situacao}</li>
                                </ul>
                            <ul>
                                <li className="movieInfoTable">Idioma</li>
                                <li className="movieInfoData">{convert.idioma}</li>
                                </ul>
                            <ul>
                                <li className="movieInfoTable">Duração</li>
                                <li className="movieInfoData">{convert.duracao}</li>
                                </ul>
                            <ul>
                                <li className="movieInfoTable">Orçamento</li>
                                <li className="movieInfoData">{"$"+Number(movie.budget).toLocaleString('pt-BR') + ",00"}</li>
                                </ul>
                            <ul>
                                <li className="movieInfoTable">Receita</li>
                                 <li className="movieInfoData">{"$"+Number(movie.revenue).toLocaleString('pt-BR') + ",00"}</li>
                                 </ul>
                            <ul>
                                <li className="movieInfoTable">Lucro</li>
                                <li className="movieInfoData">{"$"+((movie.revenue)-(movie.budget)).toLocaleString('pt-BR') + ",00"}</li>
                            </ul>
                            <ul>
                        </ul>

                        </table>
                        <div className="date">
                        <div className="movieDateOut">
                            <p className="movieDateIn">{movie.vote_average*10 + '%'}</p>
                        </div>
                        </div>
                        </div>
                        
              
                
                
                <div className="movieContainerImage">
               
                    <img className="movieImage" src={'https://image.tmdb.org/t/p/w300' + movie.poster_path} alt="Logo" />
                </div>
                </div>
           
                </div>
                <YouTube
                videoId={this.trailer()}
                opts={opts}
                onReady={this._onReady}
                />
            </div>
        );
    }
    trailer() {
        let i;
        if (this.state.trailer.key !== undefined) {
            i = this.state.trailer.key
        }
        
        return i
    }
    _onReady(event) {
        event.target.pauseVideo();
    }
}