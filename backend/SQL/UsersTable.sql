
CREATE TABLE "C09"."Users"
(
    username text unique,
    salt text not null,
    hash text not null,
    primary key (username)
);

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE "C09"."Users" TO "C09";

GRANT ALL ON TABLE "C09"."Users" TO postgres;