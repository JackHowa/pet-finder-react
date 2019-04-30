import React from "react";

const SearchContext = React.createContext({
  location: "",
  animal: "",
  breed: "",
  breeds: [],

  // these empty funcs are useful for testing
  handleAnimalChange() {},
  handleLocationChange() {},
  handleBreedChange() {},
  getBreeds() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
