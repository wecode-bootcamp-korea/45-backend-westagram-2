const dataSource  = require('./dataSource');

const createUser = async ( firstName, lastName, email, phoneNumber, age, userName, password ) => {
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
            ) VALUES ( ?, ?, ?, ?, ?, ?, ?)`, [ firstName, lastName, email, phoneNumber, age, userName, password ]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

module.exports = { createUser };