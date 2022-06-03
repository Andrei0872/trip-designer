const { Pool }  = require('pg');

class Database {
    connConfig: {user: string; host: string; database: string; password: string; port: number;};
    pool: any;
    constructor() {
        this.connConfig = {
            user: process.env.POSTGRES_USER,
            host: process.env.DB_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: 5432
          };
          
        this.pool = new Pool(this.connConfig);
    }

    async getPool () {
        return this.pool;
    }
}

module.exports = Database;