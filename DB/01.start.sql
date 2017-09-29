patchavez@Engr:~$ sudo su - postgres
[sudo] password for patchavez: 
postgres@Engr:~$ createuser unraveled 
postgres@Engr:~$ psql
psql (9.5.3)
Type "help" for help.

postgres=# alter role unraveled superuser;
ALTER ROLE
postgres=# \q
postgres@Engr:~$ exit
logout
patchavez@Engr:~$ createdb unravaled
patchavez@Engr:~$ psql unravaled
psql (9.5.3)
Type "help" for help.

contactform=# \d
No relations found.
contactform=# \q
patchavez@Engr:~$ psql unravaled 
psql (9.5.3)
Type "help" for help.

contactform=# create user ktapdasan with password '184822e36aa9494fb67770a63090acd9';
CREATE ROLE


create table accounts
(
	user_id text,
    password text DEFAULT md5('User123456!'::text),
    user_type text
);
alter table accounts owner to ktapdasan;

insert into accounts
(
	user_id,
	user_type
)
VALUES
(
	'201400028',
	'1'
);

insert into accounts
(
	user_id,
	user_type
)
VALUES
(
	'201400072',
	'2'
);

insert into accounts
(
	user_id,
	user_type
)
VALUES
(
	'2014000100',
	'1'
);

create table users
(
	pk serial primary key,
	user_id text not null,
	first_name text not null,
	middle_name text not null,
	last_name text not null,
	user_type text not null,
	date_created timestamptz default now(),
	archived boolean default false
);
alter table users owner to ktapdasan;
alter table users add column superior_pin text DEFAULT md5('SirWayne'::text);

insert into users
(
	first_name,
	middle_name,
	last_name,
	user_id,
	user_type
)
VALUES
(
	'Patrick',
	'Matetu',
	'Chavez',
	'201400028',
	'1'
);

insert into users
(
	first_name,
	middle_name,
	last_name,
	user_id,
	user_type
)
VALUES
(
	'Ken',
	'Villanueva',
	'Tapdasan',
	'201400072',
	'2'
);

insert into users
(
	first_name,
	middle_name,
	last_name,
	user_id,
	user_type
)
VALUES
(
	'R-Wayne',
	'Feliciano',
	'Lipardo',
	'2014000100',
	'1'
);

create table pictures
(
	image_pk serial primary key,
	uploaded_by int not null,
	link text not null,
	date_uploaded timestamptz default now(),
	archived boolean default false
);
alter table pictures owner to ktapdasan;