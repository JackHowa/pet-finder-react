import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

export class SearchBox extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <Consumer>
        {context => {
          const { location, animal, breed, breeds } = context;

          return (
            <div className="search-params">
              <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="location">
                  Location
                  <input
                    id="location"
                    value={location}
                    placeholder="location"
                    onChange={context.handleLocationChange}
                  />
                </label>
                <label htmlFor="animal">
                  Animal
                  <select
                    id="animal"
                    onChange={context.handleAnimalChange}
                    onBlur={context.handleAnimalChange}
                    value={animal}
                  >
                    <option />
                    {ANIMALS.map(animal => (
                      <option key={animal} value={animal}>
                        {animal}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="breed">
                  Breed
                  <select
                    id="breed"
                    value={breed}
                    onChange={context.handleBreedChange}
                    onBlur={context.handleBreedChange}
                    disabled={breeds.length === 0}
                  >
                    <option />
                    {breeds.map(breed => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={this.handleFormSubmit}>Submit</button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
