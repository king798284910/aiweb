/**
 * Created by lenovo on 2017/9/4.
 */
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/mongoosesample';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
 * 连接成功
 */

export default mongoose.connection.once('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});
