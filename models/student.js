module.exports = (sequelize, type) => {
    var Student = sequelize.define('student', {
        email: {
            type: type.STRING,
            primaryKey: true,
            unique: true
        }
    })

    Student.associate = function (models) {
        Student.belongsToMany(models.teacher, { through: 'register' });
        Student.belongsToMany(models.teacher, { as: 'StudentTeacherSuspension', through: 'suspension' });
    }

    return Student;
}