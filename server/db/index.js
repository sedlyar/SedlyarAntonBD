const { Pool } = require('pg');
const named = require('node-postgres-named');
const db = {
    user: 'postgres',
    host: 'localhost',
    database: 'taxi',
    password: 'intropij22',
    port: '5432'
};
const pool = new Pool({
    user    : db.user,
    host    : db.host,
    database: db.database,
    password: db.password,
    port    : db.port
});

let _pool = {
    query : pool.query.bind(pool),
    client: async function () {
        let client;
        client = await pool.connect();
        named.patch(client);
        return client;
    }
};
named.patch(_pool);
module.exports = _pool;
