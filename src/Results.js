import React, { Component } from "react";
import { Pet } from "./Pet";
import pf from "petfinder-client";

const LOCATION_STATE_CITY = "Chicago, IL";

export class Results extends Component {
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
      <div className="search">
        {this.state.pets.map(petObject => {
          let breed;

          if (Array.isArray(petObject.breeds.breed)) {
            breed = petObject.breeds.breed.join(", ");
          } else {
            breed = petObject.breeds.breed;
          }

          return (
            <Pet
              breed={breed}
              name={petObject.name}
              animal={petObject.animal}
              key={petObject.id}
              media={petObject.media}
              location={`${petObject.contact.city}, ${petObject.contact.state}`}
              {...petObject}
            />
          );
        })}
      </div>
    );
  }
}
