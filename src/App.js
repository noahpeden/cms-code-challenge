import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      gifs: [],
      trending: [],
      randomGif: null,
      loading: true
    }
  }

  componentDidMount(){
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  grabInput(e){
    this.setState({
      input: e.target.value
    })
  }

  displayGif(){
    if(this.state.randomGif){
      return this.renderRandom()
    }
    else if (this.state.gifs.length > 0){
      return this.mapGifs()
    }
    else if(this.state.trending.length > 0){
      return this.mapTrending()
    }
  }

  randomGif(){
    this.setState({
      loading: true,
    })
    let url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag"
    fetch(url)
    .then((response)=> {
      return response.json()
    })
    .then((data)=> {
      this.setState({
        randomGif: data.data,
        loading: false,
      })
    })
  }

  renderRandom(){
    return (<div><iframe src={`${this.state.randomGif.image_url}`} width="480" height="470.2040816326531" frameBorder="0" className="random" ></iframe><p><a href={`${this.state.randomGif.url}`}>via GIPHY</a></p></div>)
  }

  mapGifs(){
      let display = this.state.gifs.map((gif)=> {
      return (<div className="gif-frame"><iframe src={`${gif.embed_url}`} width="480" height="470.2040816326531" frameBorder="0" className="giphy-embed" ></iframe><p><a href={`${gif.url}`}>via GIPHY</a></p></div>)
    })
    return display;
  }
  mapTrending(){
      let display = this.state.trending.map((gif)=> {
      return (<div className="gif-frame"><iframe src={`${gif.embed_url}`} width="480" height="470.2040816326531" frameBorder="0" className="giphy-embed" ></iframe><p><a href={`${gif.url}`}>via GIPHY</a></p></div>)
    })
    return display;
  }

  getTrending(){
    this.setState({
      loading: true,
    })
    let url = `http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC`
    fetch(url)
    .then((response)=> {
      return response.json()
    })
    .then((data)=> {
      this.setState({
        trending: data.data,
        randomGif: null,
        loading: false,
      })
    })
  }

  sendInput(){
    this.setState({
        loading: true,
      })
    let url = `http://api.giphy.com/v1/gifs/search?q=${this.state.input}&api_key=dc6zaTOxFJmzC   `
    fetch(url)
    .then((response)=> {
      return response.json()
    })
    .then((data)=> {
      this.setState({
        gifs: data.data,
        randomGif: null,
        loading: false,
      })
     this.refs.searchInput.value = "";
    })
  }

  render() {
    const { loading } = this.state;
    if(loading) {
      return null; // render null when app is not ready
    }
    return (
      <div className="App">
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">Exercise: Frontend - JavaScript</h3>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="well">
                <div className="row">
                  <div className="col-sm-7">
                    <div className="input-group">
                      <input type="text" ref="searchInput" className="form-control" onChange={(e)=> this.grabInput(e)} placeholder="Search for..."/>
                      <span className="input-group-btn">
                        <button className="btn btn-secondary go" type="button" onClick={(e)=> this.sendInput()}>Go!</button>
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="btn-group btn-group-justified">
                      <a href="#"className="btn btn-primary" onClick={(e)=> this.randomGif()}>
                        <span className="glyphicon glyphicon-random"></span>
                        Random
                      </a>
                      <a href="#" className="btn btn-info" onClick={(e)=> this.getTrending()}>
                        <span className="glyphicon glyphicon-sunglasses"></span>
                        Trending
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="render-area">
            {this.displayGif()}
        </div>

          <footer className="footer">
            <p>&copy; 2017 Carimus, Inc.</p>
          </footer>

        </div>
      </div>
    );
  }
}

export default App;
