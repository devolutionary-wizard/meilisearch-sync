SELECT
    album.id,
    album.name,
    album.released_date,
    album_image.url AS image_url,
    COALESCE(subquery.language_id, 2) AS language_id,
    COALESCE(subquery.total_view, 0) AS total_view,
    album.created_at
FROM album
LEFT JOIN (
    SELECT
        album_track.album_id,
        track.language_id,
        SUM(track.view_count) AS total_view,
        ROW_NUMBER() OVER (PARTITION BY album_track.album_id ORDER BY SUM(track.view_count) DESC) AS rn
    FROM track
    INNER JOIN album_track ON album_track.track_id = track.id
    WHERE track.language_id != 2
    GROUP BY album_track.album_id, track.language_id
) AS subquery ON subquery.album_id = album.id AND subquery.rn = 1
LEFT JOIN (
    SELECT
        album_image_1.url,
        album_image_1.album_id,
        ROW_NUMBER() OVER (PARTITION BY album_image_1.album_id ORDER BY album_image_1.width DESC) AS rn
    FROM album_image album_image_1
) album_image ON album.id = album_image.album_id AND album_image.rn = 1
WHERE album_image.url IS NOT NULL
ORDER BY album.id ASC, album_image.url DESC
LIMIT 400000 OFFSET 1700000;