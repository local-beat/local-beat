import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Form from 'react-bootstrap/Form';
import ReactSelect from 'react-select';
import { PageIDs } from '../utilities/ids';
import { getUniqueGenres, getUniqueInstruments, getUniqueSkillLevels } from './BrowseArtists';
import { Artists } from '../../api/artists/Artists';
import LoadingSpinner from '../components/LoadingSpinner';

const CreateJamSession = () => {
  const { ready, artists } = useTracker(() => {
    const subscription = Meteor.subscribe(Artists.userPublicationName);
    const rdy = subscription.ready();
    const artistItems = Artists.collection.find().fetch();
    return {
      artists: artistItems,
      ready: rdy,
    };
  }, []);

  const uniqueSkillLevels = getUniqueSkillLevels(artists);
  const uniqueGenres = getUniqueGenres(artists);
  const uniqueInstruments = getUniqueInstruments(artists);

  return (ready ? (
    <div id={PageIDs.createJamSessionPage} style={{ backgroundImage: 'url(/images/background.jpg)' }}>
      <Container>
        <br />
        <Card className="py-4">
          <div className="px-4">
            <h1 className="text-center"> Create a Jam Session</h1>
            <Row>
              <Col>
                <Form.Group className="mb-3">

                  {/* ATTENDEES */}
                  <Form.Label>Attendees</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Attendees" />

                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">

                  {/* VENUE */}
                  <Form.Label>Venue</Form.Label>
                  <Form.Control placeholder="Venue" />

                  {/* DATE */}
                  <Form.Label>Date</Form.Label>
                  <Form.Control placeholder="Date" />

                  {/* SKILL LEVEL */}
                  <Form.Label>Skill Level:</Form.Label>
                  <Form.Select defaultValue="">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <option value="" disabled>
                      Select
                    </option>
                    {uniqueSkillLevels.map((sklvl, index) => (
                      <option key={index} value={sklvl}>
                        {sklvl}
                      </option>
                    ))}
                  </Form.Select>

                  {/* GENREs */}
                  <Form.Label>Genre(s):</Form.Label>
                  <ReactSelect
                    isMulti
                    options={uniqueGenres.map((genre) => ({ label: genre, value: genre }))}
                  />

                  {/* INSTRUMENTS */}
                  <Form.Label>Instrument(s):</Form.Label>
                  <ReactSelect
                    isMulti
                    options={uniqueInstruments.map((instrument) => ({ label: instrument, value: instrument }))}
                  />

                  {/* ABOUT */}
                  <Form.Label>About</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Write something about the jam session" />

                </Form.Group>
              </Col>
            </Row>
            <Row><Button>Submit</Button></Row>
          </div>
        </Card>
      </Container>
    </div>
  ) :
    <LoadingSpinner />
  );

};

export default CreateJamSession;
