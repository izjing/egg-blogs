'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const messageBoardtSchema = new Schema({
    name: {
      type: String,
    },
    id: {
      type: Schema.Types.ObjectId,
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
  const messageBoard = mongoose.model('messageBoards', messageBoardtSchema);

  return messageBoard;
};
