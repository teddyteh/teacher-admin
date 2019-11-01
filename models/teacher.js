module.exports = (sequelize, type) => {
    var Teacher = sequelize.define('teacher', {
        email: {
            type: type.STRING,
            primaryKey: true
        }
    })

    Teacher.associate = function (models) {
        Teacher.belongsToMany(models.student, { through: 'register' });
        // Teacher.belongsToMany(models.student, { as: 'TeacherStudentSuspension', through: 'suspension' });
    }

    return Teacher;
}