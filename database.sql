
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- database setup instructions --

--create user table --> collecting first name and last name on registration
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (50) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (80) NOT NULL,
    "last_name" VARCHAR (80) NOT NULL
);

--create ENUM for contact address types (email, SMS, URL)
CREATE TYPE ADDRESS_TYPE AS ENUM ('email', 'sms', 'url');

--create friend table --> holds each friend with a reference to the address book owner
CREATE TABLE "friend" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR (80) NOT NULL,
	"last_name" VARCHAR (80) NOT NULL,
	"user_id" INT NOT NULL REFERENCES "user" ON DELETE CASCADE
);

--create address table --> holds addresses for each contact
CREATE TABLE "address" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(50) UNIQUE,
	"sms" VARCHAR(10) UNIQUE,
	"url" VARCHAR(255),
	"pref" ADDRESS_TYPE NOT NULL,
	"friend_id" INT UNIQUE NOT NULL REFERENCES "friend" ON DELETE CASCADE
	CONSTRAINT address_1 CHECK (NOT pref = 'email'::address_type OR email::text !~~ ''::text),
	CONSTRAINT address_2 CHECK (NOT pref = 'sms'::address_type OR sms::text !~~ ''::text),
	CONSTRAINT address_3 CHECK (NOT pref = 'url'::address_type OR url::text !~~ ''::text)
);

--create timing table --> holds contact frequency and date info
CREATE TABLE "timing" (
	"id" SERIAL PRIMARY KEY,
	"frequency" INT NOT NULL,
	"last_type" ADDRESS_TYPE,
	"last_date" DATE NOT NULL,
	"due_date" DATE NOT NULL,
	"friend_id" INT UNIQUE NOT NULL REFERENCES "friend" ON DELETE CASCADE
);

-- end database setup instructions --