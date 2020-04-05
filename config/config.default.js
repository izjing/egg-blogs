/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1585829481177_8845';

  // add your middleware config here
  config.middleware = [
    'errorHandler',
  ];
  // 加密盐
  config.pwd_salt = 'egg-api-salt';

  // jsonwebtoken
  config.jwt = {
    secret: 'egg-api-jwt',
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: [ 'http://localhost:3000' ],
  };
  // 配置跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mongoose: {
      url: 'mongodb://test:123456@106.54.204.40:27017/test',
      options: {
        useUnifiedTopology: true,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
