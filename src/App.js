import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      gifs: [],
      randomGif: [],
    }
  }

  grabInput(e){
    this.setState({
      input: e.target.value
    })
  }

  randomGif(){
    let url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag"
    fetch(url)
    .then((response)=> {
      return response.json()
    })
    .then((data)=> {
      debugger;
      this.setState({
        randomGif: data.data,
      })
    })
  }

  renderRandom(){
    return (<div><iframe src={`${this.state.randomGif.image_url}`} width="480" height="470.2040816326531" frameBorder="0" className="giphy-embed" ></iframe><p><a href={`${this.state.randomGif.url}`}>via GIPHY</a></p></div>)
  }

  mapGifs(){
      let display = this.state.gifs.map((gif)=> {
      return (<div><iframe src={`${gif.embed_url}`} width="100" height="100" frameBorder="0" className="giphy-embed" ></iframe><p><a href={`${gif.url}`}>via GIPHY</a></p></div>)
    })
    return display;
  }

  sendInput(){
    let url = `http://api.giphy.com/v1/gifs/search?q=${this.state.input}&api_key=dc6zaTOxFJmzC   `
    fetch(url)
    .then((response)=> {
      return response.json()
    })
    .then((data)=> {
      this.setState({
        randomGif: data.data,
      })
    })
  }

  render() {
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
                      <input type="text" className="form-control" onChange={(e)=> this.grabInput(e)} placeholder="Search for..."/>
                      <span className="input-group-btn">
                        <button className="btn btn-secondary go" type="button" onClick={(e)=> this.sendInput()}>Go!</button>
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="btn-group btn-group-justified">
                      <a href="#" className="btn btn-primary" onClick={(e)=> this.randomGif()}>
                        <span className="glyphicon glyphicon-random"></span>
                        Random
                      </a>
                      <a href="#" className="btn btn-info">
                        <span className="glyphicon glyphicon-sunglasses"></span>
                        Trending
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>{this.state.gifs ? this.mapGifs() : ""}
            <div>{this.state.randomGif !== [] ? this.renderRandom() : ''}</div>
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
