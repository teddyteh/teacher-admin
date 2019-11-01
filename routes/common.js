var models = require('../models')
var printErrorResponse = require('../utils/error-response-printer')

module.exports = async function register(req, res, next) {
    // req.query {"teacher":["1","2"]}
    if (!req.query.teacher) {
        return printErrorResponse(res, "Teacher is not given.");
    }

    let students = await findStudents(req, res);
    // students = parseResponse(students);

    return res.status(200).json({ students: students });
}

async function findStudents(req, res) {
    let students = [];

    if (Array.isArray(req.query.teacher)) {
        for (let email of req.query.teacher) {
            let teacherStudents = await models.register.findAll({ where: { teacherEmail: email }, raw: true });
            teacherStudents = parseStudent(teacherStudents);

            if (teacherStudents.length === 0)
                students.push(-1);

            students.push(...teacherStudents);
        };

        if (students.find(s => s === -1)) {
            return [];
        }

        let filtered = students.filter((v, i) => students.indexOf(v) !== i);
        let unique = new Set(filtered);
        students = Array.from(unique);

        return students;
    } else {
        let teacherStudents = await models.register.findAll({ where: { teacherEmail: req.query.teacher }, raw: true });
        teacherStudents = parseStudent(teacherStudents);
        return teacherStudents;
    }

    return students;
}

function parseStudent(students) {
    return students.map(s => s.studentEmail);
}