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
        Student.hasMany(models.suspension);
        // Student.belongsToMany(models.teacher, { as: 'StudentTeacherSuspension', through: 'suspension' });
    }

    return Student;
}