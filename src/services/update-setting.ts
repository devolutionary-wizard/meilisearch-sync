import { MeiliSearchClient } from "../config/meilisearch";

class UpdateSettingService {
    private meilisearch: MeiliSearchClient;
    constructor() {
        this.meilisearch = new MeiliSearchClient();
    }

    async updateSetting(): Promise<void> {
        try {
            this.meilisearch.updateSortableAttributes('album', ['totalView']);
            this.meilisearch.updateSortableAttributes('track', ['id', 'released_date', 'view_count']);
            this.meilisearch.updateFilterableAttributes('track', ['id', 'released_date', 'albums']);
        } catch (error) {
            console.error('Error', error);
        }
    }

}

const updateSettingService = new UpdateSettingService()
updateSettingService.updateSetting();