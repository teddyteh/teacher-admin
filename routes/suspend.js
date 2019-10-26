var models = require('../models')
var printErrorResponse = require('../utils/error-response-printer')

module.exports = async function suspend(req, res, next) {
    if (!req.body.teacher || !req.body.student) {
        return printErrorResponse(res, "Teacher or student is not given.");
    }

    let teacher = await findTeacher(req, res);
    let student = await findStudent(req, res);

    if (!teacher || !student) {
        return printErrorResponse(res, "Teacher or student doesn't exist.");
    }

    await suspendStudent(teacher, student);

    return res.status(204).send();
}

async function findTeacher(req, res) {
    let teacher = await models.teacher.findOne({ where: { email: req.body.teacher } });

    return teacher;
}

async function findStudent(req, res) {
    let student = await models.student.findOne({ where: { email: req.body.student } });

    return student;
}

async function suspendStudent(teacher, student) {
    return teacher.addTeacherStudentSuspension(student);
}