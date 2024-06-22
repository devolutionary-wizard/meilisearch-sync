import { Database } from "../config/db";
import { MeiliSearchClient } from "../config/meilisearch";
import fs from "fs";
import path from "path";

const chunkSize = 5000;

class TrackService {
    private db: Database;
    private meilisearch: MeiliSearchClient;
    constructor() {
        this.db = new Database();
        this.meilisearch = new MeiliSearchClient();
    }

    async syncTrack(): Promise<void> {
        try {
            fs.readFile(path.join(__dirname, '..', 'queries', 'track.sql'), 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                }

                const countQuery = `SELECT COUNT(*) FROM track`;
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

                    this.meilisearch.addData('tracks', result);

                    offset += result.length;
                }

            }
            );
        } catch (error) {
            console.error('Error', error);
        }
    }
}

const trackService = new TrackService()

trackService.syncTrack();