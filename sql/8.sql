select name, creation_date,description

from photoportal.user

natural join photoportal.photo_post

order by creation_date