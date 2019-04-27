import React from "react";
import { render } from "react-dom";
import { Pet } from "./Pet";
import pf from "petfinder-client";

const LOCATION_STATE_CITY = "Chicago, IL";
class App extends React.Component {
  // super props calls parents constructor
  // react is unable to track props without it
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    // returns promise that represents a future value
    pf()
      .pet.find({ location: LOCATION_STATE_CITY, output: "full" })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            // wrap in empty array if not an array
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        // can call set state multiple times in componentDidMount
        // and it will only update once, batching them
        this.setState({
          pets
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Adopt Me</h1>
        {this.state.pets.map(petObject => (
          <Pet key={petObject.name} {...petObject} />
        ))}
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
