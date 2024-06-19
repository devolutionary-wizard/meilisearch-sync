import MeiliSearch from "meilisearch";
import { MEILI_API_KEY, MEILI_HOST } from "../constants";

export class MeiliSearchClient {
    private client: MeiliSearch;
    constructor() {
        this.client = new MeiliSearch({
            host: MEILI_HOST,
            apiKey: MEILI_API_KEY,
        });
    }

    async addData(indexName: string, data: any[]): Promise<void> {
        try {
            const index = this.client.index(indexName);
            const result = await index.addDocuments(data);
            console.log('Data added successfully', result);
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    async deleteAllData(indexName: string): Promise<void> {
        try {
            const index = this.client.index(indexName);
            const result = await index.deleteAllDocuments();
            console.log('Data deleted successfully', result);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

}




