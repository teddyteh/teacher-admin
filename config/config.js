module.exports = {
    development: {
        serverPort: 3000,
        database: 'teacher',
        username: 'root',
        password: '',
        options: {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306
        }
    },
    production: {
        serverPort: 3000,
        database: 'teacher',
        username: 'root',
        password: '',
        options: {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306
        }
    }
};