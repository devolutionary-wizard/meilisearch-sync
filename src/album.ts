import { Database } from "./config/db";
import fs from "fs";
import path from "path";
import { MeiliSearchClient } from "./config/meilisearch";

export class AlbumService {
    private db: Database;
    constructor() {
        this.db = new Database();
    }

    async syncAlbum(): Promise<void> {
        try {
            fs.readFile(path.join(__dirname, 'queries', 'album.sql'), 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                }

                const result = await this.db.query(data);

                const meilisearch = new MeiliSearchClient();
                meilisearch.addData('albums', result);

            });

        } catch (error) {
            console.error('Error fetching albums', error);
        }
    }
}

const album = new AlbumService();
album.syncAlbum()