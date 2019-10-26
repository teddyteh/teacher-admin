var models = require('../models')
var printErrorResponse = require('../utils/error-response-printer')

module.exports = async function register(req, res, next) {
    if (!req.body || !req.body.teacher || !req.body.students) {
        return printErrorResponse(res, "Teacher or students is not given.")
    } else {
        if (req.body.students.length > 0) {
            let students = await registerStudents(req, res);

            let teacher = await registerOrFindTeacher(req, res);

            if (students) {
                await assignStudentsToTeacher(teacher, students);

                return res.status(204).send();
            }
        }
    }
}

async function registerStudents(req, res) {
    let emails = [];
    req.body.students.forEach(s => {
        emails.push({ "email": s });
    })
    let students = await models.student.bulkCreate(emails, { ignoreDuplicates: true });

    return students;
}

async function registerOrFindTeacher(req, res) {
    let teacher = await models.teacher.findOne({ where: { email: req.body.teacher } });

    if (teacher)
        return teacher;
    else return await models.teacher.create({ email: req.body.teacher });
}

async function assignStudentsToTeacher(teacher, students) {
    let success = await teacher.addStudents(students, { ignoreDuplicates: true });

    return success;
}