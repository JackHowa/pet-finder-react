import React, { Component } from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import ModalContainer from "./ModalContainer";

export default class Details extends Component {
  state = {
    loading: true,
    error: ""
  };

  componentDidMount() {
    // returns promise that represents a future value
    pf()
      .pet.get({ id: this.props.id, output: "full" })
      .then(data => {
        let breed;
        const { pet } = data.petfinder;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }

        // can call set state multiple times in componentDidMount
        // and it will only update once, batching them
        this.setState({
          name: pet.name,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          breed,
          animal: pet.animal,
          loading: false,
          media: pet.media,
          description: pet.description
        });
      })
      .catch(() => navigate("/"));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    const {
      animal,
      breed,
      name,
      location,
      media,
      description,
      loading
    } = this.state;

    if (loading) {
      return <h1>loading</h1>;
    }
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <p>{description}</p>
          <ModalContainer />
        </div>
      </div>
    );
  }
}
