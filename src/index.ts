import { MeiliSearchClient } from './config/meilisearch';

const meilisearch = new MeiliSearchClient();

// meilisearch.getSetting('track');
// meilisearch.updateSortableAttributes('albums', ['totalView']);
// meilisearch.updateSortableAttributes('track', ['id', 'released_date','view_count']);
// meilisearch.updateFilterableAttributes('track', ['id', 'released_date', 'albums']);
// meilisearch.resetFilterableAttributesSettings('track');


// meilisearch.getTask('artist')
// meilisearch.getDetailTask('artist', 10062)
// meilisearch.deleteAllData('artists')