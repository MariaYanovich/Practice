USE photos;

CREATE TABLE `users`
(
  `id`       INTEGER      NOT NULL AUTO_INCREMENT,
  `login`    VARCHAR(255) NOT NULL UNIQUE,
  `password` CHAR(32)     NOT NULL,
  `role`     TINYINT      NOT NULL CHECK (`role` IN (0, 1, 2)),
  constraint ID PRIMARY KEY (`id`)
) ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

CREATE TABLE `photo_posts`
(
  `post_id` INTEGER NOT NULL AUTO_INCREMENT,
  `description` MULTILINESTRING,
  `creation_date` VARCHAR(15),
  `photo_link` VARCHAR(255),
  `author_id` INTEGER NOT NULL,
  `likes` INTEGER,
  `hashtags` VARCHAR(255),
  constraint POST_ID PRIMARY KEY (`post_id`),
  constraint AUTHOR FOREIGN KEY (`author_id`)
    REFERENCES `users` (`id`)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;