exports.getUser = (req, res, next) => {

    res.send('specified user');

}

exports.getUsers = (req, res, next) => {

    res.send('all users');

}


exports.storeUser = (req, res, next) => {

    res.send('store specified user');

}

exports.updateUser = (req, res, next) => {

    res.send('update specified user');

}


exports.deleteUser = (req, res, next) => {

    res.send('delete specified user');

}

