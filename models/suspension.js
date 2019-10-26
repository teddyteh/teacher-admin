module.exports = (sequelize, type) => {
    var Suspension = sequelize.define('suspension', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    }, {
        freezeTableName: true,
    })

    return Suspension;
}