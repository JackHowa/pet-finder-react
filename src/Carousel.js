import React, { useState } from "react";

const Carousel = props => {
  const [active, updateActive] = useState(0);
  let photos = ["http://placecorgi.com/600/600"];

  if (props.media && props.media.photos && props.media.photos.photo) {
    photos = props.media.photos.photo.filter(photo => photo["@size"] === "pn");
  }

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
            onClick={event => updateActive(Number(event.target.dataset.index))}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
