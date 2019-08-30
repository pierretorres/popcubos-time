import React,{Component} from 'react'
import api from '../../services/api'
// import YouTube from 'react-youtube';

export default class Movies extends Component {

    state = {
        movie: {},
        trailer: {}
    };

    async componentDidMount(){
        const { id } = this.props.match.params;
        const response = await api.get(`movie/${id}?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-BR`);
        const responseVideo = await api.get(`movie/${id}/videos?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-BR`);        
        console.log(response)
        this.setState({movie: response.data});
        this.setState({trailer: responseVideo.data.results[0]});
        
        console.log(responseVideo.data.results[0].id)
    }
    render(){
        const { movie }= this.state;    
        const { trailer }= this.state;    
        
        return(
            <div className="movie-info">
            
                <h2>{movie.title}</h2>
                <h2>{movie.vote_average*10 + '%'}</h2>
                <h3>{movie.release_date}</h3>
                <p>{movie.overview}</p>
                <p>{movie.status}</p> 
                <p>{movie.original_language}</p> 
                <p>{movie.runtime}</p> 
                <p>{movie.budget}</p> 
                <p>{movie.revenue}</p>
                {/* <p>{movie.revenue-movie.budget}</p> */}
                <p>{movie.genre}</p>
                <p>{trailer.name}</p>

                <img src={'https://image.tmdb.org/t/p/w200' + movie.poster_path} alt="Logo" />
                
                {/* <YouTube
                videoId="2g811Eo7K8U"
                onReady={this._onReady}
            /> */}


            </div>
        );
    }
}