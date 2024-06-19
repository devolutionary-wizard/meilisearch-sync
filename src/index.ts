import cron from 'node-cron'
import { ArtistService } from './artist';
import { AlbumService } from './album';


// Run every day at 12:00 AM
cron.schedule('0 0 * * *', () => {
    try {
        const artist = new ArtistService();
        artist.syncArtist();
        const album = new AlbumService();
        album.syncAlbum();
    } catch (error) {
        console.error('Error syncing data', error);
    }
});