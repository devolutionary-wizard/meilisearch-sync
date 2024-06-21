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

    async getSetting(indexName: string): Promise<void> {
        try {
            const index = this.client.index(indexName);
            const result = await index.getSettings();
            console.log('Settings:', result);
        } catch (error) {
            console.error('Error getting settings:', error);
        }
    }

    async updateFilterableAttributes(indexName: string, attributes: string[]): Promise<void> {
        try {
            const index = this.client.index(indexName);
            const result = await index.updateFilterableAttributes(attributes);
            console.log('Filterable attributes updated successfully', result);
        } catch (error) {
            console.error('Error updating filterable attributes:', error);
        }
    }

    async updateSortableAttributes(indexName: string, attributes: string[]): Promise<void> {
        try {
            const index = this.client.index(indexName);
            const result = await index.updateSortableAttributes(attributes);
            console.log('Sortable attributes updated successfully', result);
        } catch (error) {
            console.error('Error updating sortable attributes:', error);
        }
    }


    async resetFilterableAttributesSettings(indexName: string): Promise<void> {
        try {
            const index = this.client.index(indexName);
            const result = await index.resetFilterableAttributes();
            console.log('Settings reset successfully', result);
        } catch (error) {
            console.error('Error resetting settings:', error);
        }
    }

    async updateSortableAttributesSettings(indexName: string, attributes: string[]): Promise<void> {
        try {
            const index = this.client.index(indexName);
            const result = await index.updateSortableAttributes(attributes);
            console.log('Settings updated successfully', result);
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    }

    async resetSortableAttributesSettings(indexName: string): Promise<void> {
        try {
            const index = this.client.index(indexName);
            const result = await index.resetSortableAttributes();
            console.log('Settings reset successfully', result);
        } catch (error) {
            console.error('Error resetting settings:', error);
        }
    }

}




