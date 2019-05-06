SELECT user.NAME AS "User" 
FROM `photo album`.photo_post JOIN `photo album`.user ON photo_post.user_id = user.USER_ID
WHERE photo_post.creation_date between "2019-04-20" and "2019-04-21"
GROUP BY user.NAME 
HAVING count(*) >= 3;
