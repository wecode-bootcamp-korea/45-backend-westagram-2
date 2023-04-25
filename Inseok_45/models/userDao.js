const dataSource  = require('./dataSource');

const createUser = async ( firstName, lastName, email, phoneNumber, age, userName, hashedPassword ) => {
    try {
        return await dataSource.query(
            `INSERT INTO users(
                first_name,
                last_name,
                email,
                phone_number,
                age,
                user_name,
                password
            ) VALUES ( ?, ?, ?, ?, ?, ?, ?)`, [ firstName, lastName, email, phoneNumber, age, userName, hashedPassword ]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

const login = async ( userName, password ) => {
    try {
        return await dataSource.query(
            `SELECT
            users.password
            FROM users
            WHERE users.user_name = ?
            `, [userName]
        );
    } catch (err) {
        const error = new Error('CANNOT_FETCH_DATA');
        error.statusCode = 400;
        throw error;
    }
}


module.exports = { createUser, login };