import { v4 as uuidv4 } from 'uuid';

export const setupAndSeedTable = async (dbConn, tableName) => {
    try {
        await dbConn.exec(
            `CREATE TABLE IF NOT EXISTS ${tableName} (id UUID PRIMARY KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, date_of_birth DATE NOT NULL, email TEXT NOT NULL, biological_sex VARCHAR(50) NOT NULL, primary_physician TEXT NOT NULL, registration_date DATE NOT NULL);`
        );
        // Check if there's a row of data in the table. If there isn't, we seed the db table with some sample data.
        const entry = await dbConn.query(
            `SELECT id FROM ${tableName} LIMIT 1;`
        );
        console.log('This is rowExists', entry);
        if (entry.rows.length === 0) {
            await dbConn.exec(`INSERT INTO ${tableName} (id, first_name, last_name, date_of_birth, email, biological_sex, primary_physician, registration_date) VALUES ('${uuidv4()}', 'John', 'Smith', '1985-06-15', 'john.smith@email.com', 'Male', 'Dr. Sarah Johnson', CURRENT_DATE); INSERT INTO ${tableName} (id, first_name, last_name, date_of_birth, email, biological_sex, primary_physician, registration_date) VALUES ('${uuidv4()}', 'Maria', 'Garcia', '1992-11-23', 'maria.garcia@email.com', 'Female', 'Dr. Robert Chen', CURRENT_DATE); INSERT INTO ${tableName} (id, first_name, last_name, date_of_birth, email, biological_sex, primary_physician, registration_date) VALUES ('${uuidv4()}', 'James', 'Wilson', '1978-03-08', 'james.wilson@email.com', 'Male', 'Dr. Emily Patel', CURRENT_DATE); INSERT INTO ${tableName} (id, first_name, last_name, date_of_birth, email, biological_sex, primary_physician, registration_date) VALUES ('${uuidv4()}', 'Sophia', 'Kim', '1990-09-17', 'sophia.kim@email.com', 'Female', 'Dr. Michael Thompson', CURRENT_DATE);`);
        }
    } catch (err) {
        throw err;
    }
}