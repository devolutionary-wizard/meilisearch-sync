import { Database } from "../config/db";
import { MeiliSearchClient } from "../config/meilisearch";
import fs from "fs";
import path from "path";

const chunkSize = 5000;

export class ArtistService {
    private db: Database;
    private meilisearch: MeiliSearchClient;

    constructor() {
        this.db = new Database();
        this.meilisearch = new MeiliSearchClient();
    }

    async syncArtist(): Promise<void> {
        try {
            fs.readFile(path.join(__dirname, '..', 'queries', 'artist.sql'), 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                }
                const countQuery = `SELECT COUNT(*) FROM artist`;
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

                    console.log(`Processing chunk ${chunkSize} - offset ${offset}`);

                    await this.meilisearch.addData('artist', result);

                    offset += chunkSize;
                }
            });
        } catch (error) {
            console.error('Error', error);
        }
    }
}

const artist = new ArtistService();

artist.syncArtist();