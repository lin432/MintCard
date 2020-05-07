
CREATE TABLE "C09"."Images" (
    cardId INT,
    name varchar(30),
    path varchar(30)
);

ALTER TABLE "C09"."Images"
    OWNER to postgres;

GRANT SELECT ON TABLE "C09"."Images" TO "C09";

GRANT ALL ON TABLE "C09"."Images" TO postgres;

-- change path
COPY "C09"."Images" FROM '/Users/abeldeb/Documents/utsc/cscc09/project/project-mint/backend/imageFileData.csv' DELIMITER ',' CSV HEADER