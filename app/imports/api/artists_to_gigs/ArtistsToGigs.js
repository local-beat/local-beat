import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ArtistsToGigsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ArtistsToGigsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      artist_id: { type: String, optional: false },
      gig_id: { type: String, optional: false },
    });

    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const ArtistsToGigs = new ArtistsToGigsCollection();
