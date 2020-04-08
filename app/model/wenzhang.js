'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    describe: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    articleCreate: {
      type: Date,
      default: Date.now,
    },
  });
  // 映射到egg-mongo db 库的users表中（不区分大小写）
  const Wenzhang = mongoose.model('wenzhang', UserSchema);

  return Wenzhang;
};
