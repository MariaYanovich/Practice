select post_id, name, photo_link, creation_date, description

from photoportal.user

natural join photoportal.photo_post

where LENGTH(description) > 12