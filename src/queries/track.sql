 SELECT
            t.id,
            t.title,
            ti.url AS image_url,
            COALESCE(t.language_id, 2) AS language_id,
            COALESCE(t.view_count, 0) AS total_view,
            t.released_date,
            t.created_at,
            t.has_lyric,
            a.id AS album_id,
            a.name AS album_name,
            COALESCE(
                CASE
                    WHEN bool_or(at2 IS NOT NULL) THEN json_agg(DISTINCT at2)
                    ELSE '[]'::json
                END,
                '[]'::json
            ) AS albums,
            ar.id AS artist_id,
            ar.name AS artist_name,
            COALESCE(
                CASE
                    WHEN bool_or(ta2 IS NOT NULL) THEN json_agg(DISTINCT ta2)
                    ELSE '[]'::json
                END,
                '[]'::json
            ) AS artists
        FROM track t
        LEFT JOIN album_track at1 ON at1.track_id = t.id
        LEFT JOIN album a ON a.id = at1.album_id
        LEFT JOIN track_artist ta1 ON ta1.track_id = t.id
        LEFT JOIN artist ar ON ar.id = ta1.artist_id
        LEFT JOIN LATERAL (
            SELECT url
            FROM track_image
            WHERE track_image.track_id = t.id
            ORDER BY track_image.width DESC
            LIMIT 1
        ) ti ON true
        LEFT JOIN LATERAL (
            SELECT album.id, album.name
            FROM album
            LEFT JOIN album_track ON album_track.album_id = album.id
            WHERE album_track.track_id = t.id
        ) at2 ON true
        LEFT JOIN LATERAL (
            SELECT DISTINCT artist.id, artist.name
            FROM artist
            LEFT JOIN track_artist ON track_artist.artist_id = artist.id
            WHERE track_artist.track_id = t.id
        ) ta2 ON true
        GROUP BY t.id, t.title, ti.url, t.language_id, t.view_count, a.id, a.name, ar.id, ar.name
        ORDER BY t.id asc
        LIMIT $1 OFFSET $2;