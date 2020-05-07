-- Table: "C09"."Cards"

-- DROP TABLE "C09"."Cards";

CREATE TABLE "C09"."Cards"
(
    "cardId" integer NOT NULL DEFAULT nextval('"C09"."Cards_cardId_seq"'::regclass),
    data jsonb,
    CONSTRAINT "Cards_pkey" PRIMARY KEY ("cardId")
)

TABLESPACE pg_default;

ALTER TABLE "C09"."Cards"
    OWNER to postgres;

GRANT SELECT ON TABLE "C09"."Cards" TO "C09";

GRANT ALL ON TABLE "C09"."Cards" TO postgres;

-- use absolute path to standardCardsList.json 

\set cardsJson `cat /Users/abeldeb/Documents/utsc/cscc09/project/project-mint/backend/standardCardsList.json`

INSERT INTO "C09"."Cards"(
    "data"
    )
SELECT
    value
FROM jsonb_array_elements(:'cardsJson');
