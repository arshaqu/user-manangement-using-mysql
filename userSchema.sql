CREATE TABLE `usermanagement`.`user` (
    `id` INT NOT NULL AUTO_INCREMENT, `first_name` VARCHAR(20) NOT NULL, `last_name` VARCHAR(20) NOT NULL, `email` VARCHAR(40) NOT NULL, `phone` VARCHAR(10) NOT NULL, `comment` TEXT NOT NULL, `status` VARCHAR(10) NOT NULL DEFAULT 'active', PRIMARY KEY (`id`)
) ENGINE = InnoDB;