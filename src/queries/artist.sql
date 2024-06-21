SELECT artist.id,
       artist.name,
       artist.gender,
       artist_image.url AS image_url,
       COALESCE(subquery.language_id, 2) AS language_id,
       COALESCE(subquery.total_view, 0) AS total_view
FROM artist
LEFT JOIN (
    SELECT track_artist.artist_id,
           track.language_id,
           SUM(track.view_count) AS total_view,
           ROW_NUMBER() OVER (PARTITION BY track_artist.artist_id ORDER BY COUNT(*) DESC) AS rn
    FROM track
    LEFT JOIN track_artist ON track_artist.track_id = track.id
    WHERE track.language_id != 2
    GROUP BY track_artist.artist_id, track.language_id
) AS subquery ON subquery.artist_id = artist.id AND subquery.rn = 1
LEFT JOIN (
    SELECT artist_image_1.url,
           artist_image_1.artist_id,
           ROW_NUMBER() OVER (PARTITION BY artist_image_1.artist_id ORDER BY artist_image_1.width DESC) AS range
    FROM artist_image artist_image_1
) AS artist_image ON artist.id = artist_image.artist_id AND artist_image.range = 1
WHERE artist_image.url IS NOT NULL
GROUP BY artist.id, artist.name, artist.gender, artist_image.url, subquery.language_id, subquery.total_view
ORDER BY artist.id ASC, artist_image.url DESC
LIMIT $1 OFFSET $2;