import React from 'react';
import PropTypes from 'prop-types';
import './ArtistCardStyle.css';
import { Card, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { List } from 'react-bootstrap-icons';

// Maximum Length of Genres that should be displayed
const MAX_CARD_GENRES_LEN = 25;

// Maximum Length of Instruments that should be displayed
const MAX_CARD_INSTRUMENTS_LEN = 25;

// Maximum Length of Bio that should be displayed
const MAX_CARD_BIO_LEN = 135;

// A function used to truncate card data to a length specified by maxlen
const truncateTo = (data, maxlen) => {
  if (!data || data.length <= maxlen) {
    return data;
  }
  const truncatedData = data.slice(0, maxlen);
  const lastWord = truncatedData.lastIndexOf(' ');
  const truncatedDataWord = truncatedData.slice(0, lastWord);
  return `${truncatedDataWord}...`;
};

const artistEntrySchema = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  image: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  instruments: PropTypes.arrayOf(PropTypes.string),
  skillLevel: PropTypes.string,
  bio: PropTypes.string,
  _id: PropTypes.string,
});

export const isValidArtist = (artistToValidate) => {
  if (
    artistToValidate &&
    artistToValidate.firstName &&
    Array.isArray(artistToValidate.genres) &&
    Array.isArray(artistToValidate.instruments) &&
    artistToValidate.skillLevel
  ) {
    return true;
  }
  return false;

};

const ArtistCard = ({ artistEntry }) => {
  // old code when i thought artistEntry was different than Artists :( actually ended up wasting like 2 hours on this so i don't want to delete it lol
  // const artistToView = Artists.collection.findOne({ email: artistEntry.email });
  // const artistId = artistEntry._id;
  if (!isValidArtist(artistEntry)) {
    return null;
  }
  return (
    <div className="artistCard">
      <Card className="h-100">
        <Card.Header>
          <Link to={`/viewProfile/${artistEntry.email}`}>
            <div className="d-flex justify-content-center">
              <Card.Title>{artistEntry.firstName} {artistEntry.lastName}</Card.Title>
            </div>
            <div className="d-flex justify-content-center">
              <Image src={artistEntry.image} height={100} className="image-shadow" />
            </div>
          </Link>
        </Card.Header>
        <ListGroup variant="flush">

          <ListGroup.Item className="d-flex justify-content-between align-items-center genres">
            <span className="label fw-bold d-flex justify-content-start">Genre(s): </span>
            <span className="content">{truncateTo(artistEntry.genres.join(', '), MAX_CARD_GENRES_LEN)}</span>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center instruments">
            <span className="label fw-bold d-flex justify-content-start">Instrument(s): </span>
            <span className="content">{truncateTo(artistEntry.instruments.join(', '), MAX_CARD_INSTRUMENTS_LEN)}</span>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center skillLevel">
            <span className="label fw-bold d-flex justify-content-start">Skill Level: </span>
            <span className="content">{artistEntry.skillLevel}</span>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-start bio">
            <div className="label fw-bold d-flex justify-content-start">Bio:</div>
            <br />
            {truncateTo(artistEntry.bio, MAX_CARD_BIO_LEN)}
          </ListGroup.Item>

        </ListGroup>

      </Card>
    </div>
  );
};

ArtistCard.propTypes = {
  artistEntry: artistEntrySchema,
}.isRequired;

export default ArtistCard;
