'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AuthCodeSchema = new Schema({
    email: {
      type: String,
    },
    userName: {
      type: String,
    },
    authCode: {
      type: Number,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  });
  // 映射到egg-mongo db 库的abouts表中（不区分大小写）
  const authCode = mongoose.model('authcode', AuthCodeSchema);

  return authCode;
};
