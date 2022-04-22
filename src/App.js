import React, { Component } from 'react';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Clarifai from 'clarifai';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import ModelView from './components/ModelView/ModelView';
import './App.css';

const particlesOptions = {
  id: 'tsparticles',
  options: {
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        speed: 5,
        straight: true,
      },
      number: {
        density: {
          enable: true,
          area: 700,
        },
        value: 90,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'none',
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  },
};

const initialState = {
  input: {
    facedetection: '',
    prediction: '',
  },
  boxes: [],
  predictedValues: [],
  route: 'signin',
  isSignedIn: false,
  imageHeight: 0,
  model: 'facedetection',
  imageURL: {
    facedetection: '',
    prediction: '',
  },
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  updateModel = event => {
    this.setState(prevState => {
      const newObj = Object.assign(
        {},
        { model: event.target.name },
        { imageURL: { ...this.state.imageURL } }
      );

      newObj.imageURL[prevState.model] = '';
      return newObj;
    });
  };

  onInputChange = event =>
    this.setState(prevState => {
      const newObj = Object.assign({}, { input: { ...this.state.input } });
      newObj.input[this.state.model] = event.target.value;
      return newObj;
    });

  calculateFaceLocations = data => {
    const clarifaiFaces = data.outputs[0].data.regions.map(face => {
      return face.region_info.bounding_box;
    });
    const { image, height } = this.calculateImageHeight();
    const width = Number(image.width);
    const faceCoordinates = clarifaiFaces.map(face => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
    return faceCoordinates;
  };

  calculateImageHeight = () => {
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    this.setState({ imageHeight: height });
    return { image, height };
  };

  displayFaceBoxes = faceBoxes => {
    this.setState({ boxes: faceBoxes });
  };

  onButtonSubmit = () => {
    if (this.state.input[this.state.model] === '') {
      alert("Don't try to cheat the rules...upload a valid image URL!");
      return;
    }

    this.setState(prevState => {
      const newObj = Object.assign(
        {},
        {
          imageURL: { ...prevState.imageURL },
        }
      );
      newObj.imageURL[this.state.model] = this.state.input[this.state.model];
      return newObj;
    });

    fetch('https://powerful-cove-68412.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input[this.state.model],
        model: this.state.model,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          fetch('https://powerful-cove-68412.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then(response => response.json())
            .then(count => {
              this.setState(() => {
                const userObj = Object.assign(this.state.user, {
                  entries: count,
                });
                return { user: userObj };
              });
            })
            .catch(err => console.log(err));
          if (this.state.model === 'facedetection') {
            this.displayFaceBoxes(this.calculateFaceLocations(data));
          } else {
            const { height } = this.calculateImageHeight();
            this.setState({
              predictedValues: [...data.outputs[0].data.concepts],
              imageHeight: height,
            });
          }
        }
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState({ ...initialState });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };

  render() {
    const {
      isSignedIn,
      boxes,
      imageURL,
      route,
      predictedValues,
      model,
      input,
      imageHeight,
    } = this.state;
    return (
      <div className="App">
        <Particles className="particles" {...particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ModelView
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              boxes={boxes}
              imageURL={imageURL.facedetection}
              predictedValues={predictedValues}
              predictionURL={imageURL.prediction}
              updateModel={this.updateModel}
              model={model}
              inputValues={input}
              imageHeight={imageHeight}
            />
          </div>
        ) : route === 'register' ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
