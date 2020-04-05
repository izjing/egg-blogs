'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 按照mock的数据，有四个字段：name/age/sex/job lastTime是用来标记最后的更改时间
  const UserSchema = new Schema({
    name: {
      type: String,
    },
    userName: {
      type: String,
    },
    userPass: {
      type: String,
    },
    userEmail: {
      type: String,
    },

  });
  // 映射到egg-mongo db 库的users表中（不区分大小写）
  const User = mongoose.model('Users', UserSchema);

  return User;
};
