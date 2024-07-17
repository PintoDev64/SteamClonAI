CREATE TABLE `b9sgxtf0fhvfste3yfvs`.`User` (
    `ACCOUNT_ID` INT NOT NULL AUTO_INCREMENT,
    `PUBLIC_ID` VARCHAR(255) NOT NULL,
    `STATUS` VARCHAR(255),
    `PROFILE_NAME` VARCHAR(255) NOT NULL,
    `ACCOUNT_NAME` VARCHAR(255) NOT NULL,
    `REAL_NAME` VARCHAR(255) NOT NULL,
    `VAC_STATUS` BOOLEAN NOT NULL,
    `MAIL` VARCHAR(255) NOT NULL,
    `THEME` INT,
    `PROFILE_PICTURE` INT,
    `BACKGROUND_IMAGE` INT,
    `TOKEN` VARCHAR(255) NOT NULL,
    `PASSWORD` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`ACCOUNT_ID`)
) ENGINE = InnoDB;

INSERT INTO
    `User` (
        `PUBLIC_ID`,
        `STATUS`,
        `PROFILE_NAME`,
        `ACCOUNT_NAME`,
        `REAL_NAME`,
        `VAC_STATUS`,
        `MAIL`,
        `THEME`,
        `PROFILE_PICTURE`,
        `BACKGROUND_IMAGE`,
        `TOKEN`,
        `PASSWORD`
    )
VALUES
    (
        'bf1f7936-c98f-4714-bb53-50dbb6d52fe0',
        'Offline',
        'profile_name',
        'account_name',
        'name',
        '1',
        'example@gmail.com',
        '1',
        '1',
        '1',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YmYxZjc5MzYtYzk4Zi00NzE0LWJiNTMtNTBkYmI2ZDUyZmUwL2FjY291bnRfbmFtZS9nbWFpbA.vT_aW3Xi7-wv0f46qWBJPDSYUnmLs0BVS1wFlnZTplc',
        'strong_password'
    );