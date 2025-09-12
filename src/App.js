import React, {Component} from 'react'; 
import Particles from './components/Particles/Particles';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkform from './components/ImageLinkform/ImageLinkform';
// import { isString } from '@tsparticles/engine';

const initialState={
      input:'',
      ImageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }


class App extends Component{
  constructor() {
    super();
    this.state=initialState
  }

  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  
  calculateFaceLocation = (data) => {
    if (data && data.outputs && data.outputs[0].data.regions.length){
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  };
}
return{};
}


  displayFacebox=(box)=>{
    this.setState({box: box});
    console.log(box);
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }


  
onButtonClick = () => {
this.setState({imageUrl: this.state.input});
     fetch('https://smart-brain-api-qms8.onrender.com/imageUrl',{
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                input: this.state.input
              })
            })
     .then(response=>response.json())      
     .then(response => {
           if (response) {
            fetch('https://smart-brain-api-qms8.onrender.com/image',{
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
             this.setState({ user: { ...this.state.user, entries: count } })
            })
            .catch(console.log)
          }
          this.displayFacebox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log('Clarifai API error:', err));
    }


onRouteChange=(route)=>{
  if(route === "signout"){
    this.setState(initialState)
  }else if(route === "home"){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}



  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
     <Particles />
    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
    {route === 'home'
    ?<div>
     <Logo />
    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
    <ImageLinkform 
    onInputChange={this.onInputChange}
    onButtonClick={this.onButtonClick}
    />
   <FaceRecognition box={box} imageUrl={imageUrl}/>
   </div>
   
   :(
    route=== 'signin'
    ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
    :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
   )
    }
    </div>
  );
  }
};


export default App;
