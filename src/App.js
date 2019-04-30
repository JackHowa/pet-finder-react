import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import Results from "./Results";
import { SearchParams } from "./SearchParams";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import NavBar from "./NavBar";

const LoadableDetails = Loadable({
  // split out details into a separate bundle
  loader: () => import("./Details"),
  loading: () => <h1>loading split out code</h1>
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      animal: "",
      breed: "",
      breeds: [],
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      handleAnimalChange: this.handleAnimalChange,
      getBreeds: this.getBreeds
    };
  }

  handleLocationChange = event =>
    this.setState({ location: event.target.value });

  handleAnimalChange = event =>
    this.setState({ animal: event.target.value, breed: "" }, this.getBreeds);

  handleBreedChange = event => this.setState({ breed: event.target.value });
  // doesn't need arrow
  getBreeds() {
    if (this.state.animal) {
      pf()
        .breed.list({ animal: this.state.animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            this.setState({ breeds: [] });
          }
        });
    } else {
      this.setState({
        breeds: []
      });
    }
  }

  handleBreedChange = event => this.setState({ breed: event.target.value });

  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <SearchParams path="/search-params" />
            <Results path="/" />
            <LoadableDetails path="/details/:id" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
