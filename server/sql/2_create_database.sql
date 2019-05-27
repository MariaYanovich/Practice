CREATE DATABASE photos DEFAULT CHARACTER SET utf8;

GRANT SELECT,INSERT,UPDATE,DELETE
  ON photos.*
  TO library_user@localhost
  IDENTIFIED BY 'library_password';

GRANT SELECT,INSERT,UPDATE,DELETE
  ON `photos`.*
  TO web_user@'%'
  IDENTIFIED BY 'password';