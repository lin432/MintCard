-- Table: "C09"."Decks"

-- DROP TABLE "C09"."Decks";

CREATE TABLE "C09"."Decks"
(
    id uuid NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    owner text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    cards character varying(10)[] COLLATE pg_catalog."default",
    CONSTRAINT "Decks_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE "C09"."Decks"
    OWNER to postgres;

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE "C09"."Decks" TO "C09";

GRANT ALL ON TABLE "C09"."Decks" TO postgres;