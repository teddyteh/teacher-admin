var models = require('../models')
var printErrorResponse = require('../utils/error-response-printer')

module.exports = async function notification(req, res, next) {
    if (!req.body.teacher || !req.body.notification) {
        return printErrorResponse(res, "Teacher or notification is not given.");
    }

    let teacher = await findTeacher(req, res);

    if (teacher) {
        let students = await findStudents(req, res);
        let mentions = await getMentions(req, res);
        let suspensions = await findSuspensions(req, res);
        let recipients = await filterStudents(students, mentions, suspensions);

        return res.status(200).json({ recipients });
    } else {
        return printErrorResponse(res, "Teacher doesn't exist.");
    }
}

async function findTeacher(req, res) {
    let teacher = await models.teacher.findOne({ where: { email: req.body.teacher } });

    return teacher;
}

async function findStudents(req, res) {
    let students = await models.register.findAll({ where: { teacherEmail: req.body.teacher }, raw: true });

    students = students.map(s => s.studentEmail);

    return students;
}

async function getMentions(req, res) {
    let mentions = [];

    let words = req.body.notification.split(" ");
    words.forEach(word => {
        if (word.charAt(0) === "@") {
            mentions.push(word.substr(1));
        }
    });

    return mentions;
}

async function findSuspensions(req, res) {
    let suspensions = await models.suspension.findAll({ raw: true });

    // [{
    //     id: 1,
    //     createdAt: 2019 - 10 - 25T13: 51: 54.000Z,
    //     updatedAt: 2019 - 10 - 25T13: 51: 54.000Z,
    //     studentEmail: 'student2@email.com',
    //     teacherEmail: 'mrtan@email.com'
    // }]

    suspensions = suspensions.map(s => s.studentEmail);

    return suspensions;
}

async function filterStudents(students, mentions, suspensions) {
    students = students.filter(s => {
        if (suspensions.includes(s)) {
            return false;
        }
        return true;
    });

    mentions.forEach(mention => {
        if (!students.includes(mention)) {
            students.push(mention);
        }
    });

    return students;
}