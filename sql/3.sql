SELECT user.NAME AS "User", photo_post.description AS "Description", photo_post.creation_date AS "Publishing Date", photo_post.photo_link AS "Link"
FROM `photo album`.photo_post JOIN `photo album`.user ON photo_post.user_id = user.USER_ID
WHERE photo_post.user_id = 10 and photo_post.creation_date between "2019-05-01" and "2019-05-02";