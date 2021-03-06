import React, { Component } from "react";
import { connect } from "react-redux";
import { Pet } from "./Pet";
import pf from "petfinder-client";
import SearchBox from "./SearchBox";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    pf()
      .pet.find({
        location: this.props.location,
        output: "full",
        animal: this.props.animal,
        breed: this.props.breed
      })
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
  };

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
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
              id={petObject.id}
              location={`${petObject.contact.city}, ${petObject.contact.state}`}
              {...petObject}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ location, breed, animal }) => ({
  location,
  breed,
  animal
});

export default connect(mapStateToProps)(Results);
