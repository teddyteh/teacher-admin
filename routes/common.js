var models = require('../models')
var printErrorResponse = require('../utils/error-response-printer')

module.exports = async function register(req, res, next) {
    // req.query {"teacher":["1","2"]}
    if (!req.query.teacher) {
        return printErrorResponse(res, "Teacher is not given.");
    }

    let students = await findStudents(req, res);
    students = parseResponse(students);

    return res.status(200).json({ students: students });
}

async function findStudents(req, res) {
    let students = await models.register.findAll({ where: { teacherEmail: req.query.teacher } });

    //[{"createdAt":"2019-10-25T07:07:04.000Z","updatedAt":"2019-10-25T07:07:04.000Z","studentEmail":"student1@email.com","teacherEmail":"mrtan@email.com"}]

    return students;
}

function parseResponse(students) {
    return students.map(s => s.studentEmail);
}