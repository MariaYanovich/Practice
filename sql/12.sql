select name, count(user_id)
from photoportal.user

natural join photoportal.photo_post

where creation_date like '____-05-09 __:__:__'

group by user_id