import React, { Component } from "react";

export class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  };

  // every time props change, state changes
  // static method exists on class level, not instance level
  static getDerivedStateFromProps({ media }) {
    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }

  // doesn't create a new context with arrow function
  // reverts to whatever lexical scope of the instance
  handleIndexClick = event => {
    this.setState({ active: Number(event.target.dataset.index) });
  };

  render() {
    // want to make render method as simple as possible
    // using getDerived state

    const { active, photos } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="current-pet" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              key={photo.value}
              src={photo.value}
              alt={"animal-thumbnail"}
              className={active === index ? "active" : ""}
              data-index={index}
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}
