select name
from photoportal.user
natural join photoportal.photo_post
where datediff(curtime(), str_to_date(creation_date, '%Y-%m-%d %T')) = 0
group by user_id
having count(user_id) > 3