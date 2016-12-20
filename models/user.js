var connection = require('../connection');

function User() {
    this.get = function(res) {
       connection.acquire(function(err, con) {
            con.query('select * from user', function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function(user, res) {
        connection.acquire(function(err, con) {
            con.query('insert into user set ?', user, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Failed to create user.'});
                } else {
                    res.send({status: 0, message: 'User created successfully.'});
                }
            });
        });
    };

    this.update = function(user, res) {
        connection.acquire(function(err, con) {
            con.query('update user set ? where id = ?', [user, user.id], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Failed to update.'});
                } else {
                    res.send({status: 0, message: 'User updated successfully.'});
                }
            });
        });
    };

    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('delete from user where id = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Failed to delete.'});
                } else {
                    res.send({status: 0, message: 'User deleted successfully.'});
                }
            });
        });
    };
}

module.exports = new User();