const mongoose = require("mongoose");

// Save a reference to the Schema
const Schema = mongoose.Schema;

// Using the Schema constructor, Schema object

const NoteSchema = new Schema({
  // `noteText` is of type String
  noteText: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;