import { builtinModules } from "module";

const { Pool }  = require('pg');

class Database {
    connConfig: { user: string; host: string; database: string; password: string; port: number; };
    pool: any;
    client: Promise<any>;

    constructor() {
        this.connConfig = {
            user: process.env.POSTGRES_USER,
            host: process.env.DB_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: 5432,
          };
          
        this.pool = new Pool(this.connConfig);
        this.client = this.connect();
    }

    async connect () {
        try {
            var client = await this.pool.connect();
          
            console.log('[DB]: Successfully connected.');
            return client;

          } catch (err: any) {
            console.log(err.message);
            return null;
          }
    }
}

module.exports = new Database;