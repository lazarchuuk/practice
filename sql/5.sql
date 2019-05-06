SELECT user.NAME AS "User", count(*) AS "Number Of Posts"
FROM `photo album`.photo_post JOIN `photo album`.user ON photo_post.user_id = user.USER_ID
GROUP BY user.NAME 
HAVING count(*) >= 3;