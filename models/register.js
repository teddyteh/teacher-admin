module.exports = (sequelize, type) => {
    var Register = sequelize.define('register', {

    }, {
        freezeTableName: true,
    })

    return Register;
}