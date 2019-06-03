select user_id, name 
from photoportal.user

natural join photoportal.photo_post

group by user_id

having count(user_id) > 3