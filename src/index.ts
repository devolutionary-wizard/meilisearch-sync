import cron from 'node-cron'
import { ArtistService } from './artist';
import { AlbumService } from './album';
import { MeiliSearchClient } from './config/meilisearch';


// Run every day at 12:00 AM
// cron.schedule('0 0 * * *', () => {
//     try {
//         const artist = new ArtistService();
//         artist.syncArtist();
//         const album = new AlbumService();
//         album.syncAlbum();
//     } catch (error) {
//         console.error('Error syncing data', error);
//     }
// });


const meilisearch = new MeiliSearchClient();

meilisearch.getSetting('track');
// meilisearch.updateSortableAttributes('albums', ['totalView']);
// meilisearch.updateSortableAttributes('track', ['id', 'released_date','view_count']);
// meilisearch.updateFilterableAttributes('track', ['id', 'released_date', 'albums']);
// meilisearch.resetFilterableAttributesSettings('track');
