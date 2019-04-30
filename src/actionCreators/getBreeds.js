import pf from "petfinder-client";

export default function getBreeds() {
  return function(dispatch, getState) {
    const { animal } = getState();
    pf()
      .breed.list({ animal })
      .then(data => {
        let breeds = [];
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          breeds = data.petfinder.breeds.breed;
        }
        dispatch({ type: "SET_BREEDS", payload: breeds });
      });
  };
}
