import { Database } from "./config/db";
import fs from "fs";
import path from "path";
import { MeiliSearchClient } from "./config/meilisearch";

const chunkSize = 5000;

export class AlbumService {
    private db: Database;
    private meilisearch: MeiliSearchClient;
    constructor() {
        this.db = new Database();
        this.meilisearch = new MeiliSearchClient();
    }

    async syncAlbum(): Promise<void> {
        try {
            fs.readFile(path.join(__dirname, 'queries', 'album.sql'), 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                }

                const countQuery = `SELECT COUNT(*) FROM album`;
                const countResult = await this.db.query(countQuery);
                const totalRows = parseInt(countResult[0].count, 10);

                if (isNaN(totalRows)) {
                    throw new Error("Failed to parse totalRows as a number.");
                }

                console.log("===== Total Row =====", totalRows);
                let offset = 0;

                while (offset < totalRows) {
                    console.log("======= Start loop =========");

                    const result = await this.db.query(data, [chunkSize, offset]);

                    console.log(`Processing chunk ${result.length} - offset ${offset}`);

                    this.meilisearch.addData('albums', result);

                    offset += result.length;
                }

            });

        } catch (error) {
            console.error('Error fetching albums', error);
        }
    }
}

const album = new AlbumService();
album.syncAlbum()