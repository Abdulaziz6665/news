create database news;
create extension if not exists "uuid-ossp";
ALTER DATABASE postgres SET timezone TO 'Asia/Tashkent';


create table if not exists verify_phone(
    id serial not null,
    phone varchar(12) not null,
    received_code int not null,
    expire_time timestamp default current_timestamp + (2 * interval '1 minute')
);

create type e_user_status as Enum('ACTIVE','BANNED');
create type e_user_role as Enum('ADMIN','MODERATOR','USER');

create table if not exists users(
    user_id uuid not null default uuid_generate_v4() primary key,
    user_name varchar(32) not null,
    user_phone varchar(12) not null,
    user_email varchar(32),
    user_pass varchar(32) not null,
    user_status e_user_status not null default 'ACTIVE',
    user_role e_user_role not null default 'USER',
    created_at timestamp not null default current_timestamp,
    deleted timestamp
);

create type e_news_status as Enum('READY','IN_REVIEW');

create table if not exists news(
    news_id uuid not null default uuid_generate_v4() primary key,
    news_title text not null,
    news_description text not null,
    news_body text not null,
    news_status e_news_status not null default 'IN_REVIEW',
    news_date date not null default current_date,
    news_time time not null default current_time
);
