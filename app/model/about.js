'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AboutSchema = new Schema({
    userName: {
      type: String,
    },
    content: {
      type: String,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  });
  // 映射到egg-mongo db 库的abouts表中（不区分大小写）
  const About = mongoose.model('abouts', AboutSchema);

  return About;
};
