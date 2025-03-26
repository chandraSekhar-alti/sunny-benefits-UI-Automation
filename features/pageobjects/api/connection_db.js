const { Client } = require('pg');

class connection_db {
    async connectToPostgres() {
        const pgConfig = {
            host: 'localhost',  // Use localhost since PuTTY forwards the port locally
            port: 8433,         // The local port you specified in PuTTY (e.g., 5433)
            user: 'happusr',
            password: 'negKIOKktUR@yk2Q',
            database: 'helios',
            sslmode: "disable",
            ssl: { rejectUnauthorized: false }
        };

        // Initialize PostgreSQL client
        const pgClient = new Client(pgConfig);
        // Connect to PostgreSQL
        await pgClient.connect();
        const consumer_task_res = await pgClient.query(`Select * from task.consumer_task WHERE consumer_code = 'cmr-6d0a7d4498654df781b440d3d65911e6' and task_id=4`);
        console.log("Consumer_Task db Rows : ", consumer_task_res);

        // // Connect to the PostgreSQL database
        // client.connect()
        //     .then(() => console.log('Connected to PostgreSQL through SSH tunnel'))
        //     .catch(err => console.error('Connection error', err.stack));

        // // Execute a query
        // client.query('Select * from task.consumer_task WHERE consumer_code = `cmr-6d0a7d4498654df781b440d3d65911e6` and task_id=4')
        //     .then(res => console.log(res.rows))
        //     .catch(err => console.error('Query error', err.stack))
        //     .finally(() => client.end());
    };


}
connection_db = new connection_db();
connection_db.connectToPostgres();