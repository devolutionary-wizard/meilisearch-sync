import path from "path";
import { Database } from "./config/db";
import fs from "fs";
import { MeiliSearchClient } from "./config/meilisearch";

export class ArtistService {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    async syncArtist(): Promise<void> {
        try {
            fs.readFile(path.join(__dirname, 'queries', 'artist.sql'), 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                }
                console.log('data', data)
                const result = await this.db.query(data);

                const meilisearch = new MeiliSearchClient();
                meilisearch.addData('artists', result);

            });


        } catch (error) {
            console.error('Error fetching artists', error);
        }
    }
}

const artist = new ArtistService();

artist.syncArtist()

