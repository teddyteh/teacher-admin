module.exports = function printErrorResponse(res, message) {
    return res.status(400).json({ message });
}