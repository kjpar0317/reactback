var config = require('./db_config.json');

var mysql   = require("mysql");

var pool = mysql.createPool({
    connectionLimit : 10,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

var dbPool = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows, err);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = dbPool;