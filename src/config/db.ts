import { Pool } from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from '../constants';

export class Database {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: DB_USER,
            host: DB_HOST,
            database: DB_DATABASE,
            password: DB_PASSWORD,
            port: 5432,
            max: 5
        });
    }


    async query(text: string, params: any[] = []): Promise<any> {
        const client = await this.pool.connect();
        try {
            const { rows } = await this.pool.query(text, params);
            return rows;
        } catch (err) {
            console.error('query error', err);
            throw err;
        } finally {
            client.release();
        }
    }
}