'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CriticismSchema = new Schema({
    id: {
      type: String,
    },
    userName: {
      type: String,
    },
    name: {
      type: String,
    },
    isHuiFu: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  });
  const Criticism = mongoose.model('criticisms', CriticismSchema);

  return Criticism;
};
