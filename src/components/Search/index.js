import React, {Component} from 'react';
import api from '../../services/api';


class Search extends Component {
    
    constructor(props) {
     super(props);
     this.state = {value: ''};
 
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }
 
   handleChange(event) {
     this.setState({value: event.target.value});
   }
 
   handleSubmit(event) {
     alert('Um nome foi enviado: ' + this.state.value);
     event.preventDefault();
   }
   componentDidMount(){
       
    this.loadMovie();
}
loadMovie = async () => {
    // const response = await api.get(movieId +'?api_key=b160d520a251ec089deab6fdc48006f2')
    const response = await api.get('?api_key=b160d520a251ec089deab6fdc48006f2')

 console.log(response);
};

   render() {
     return (
       <form onSubmit={this.handleSubmit}>
         <label>
           Nome:
           <input type="text" value={this.state.value} onChange={this.handleChange} />
         </label>
         {/* <input type="submit" value="Enviar" /> */}
       </form>
     );
   }
   
}
export default Search;