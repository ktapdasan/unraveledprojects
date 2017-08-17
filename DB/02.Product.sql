create table product_data
(
	pk serial primary key,
	product_name text not null,
	product_bar_code text not null,
	product_stocks int not null,
	product_price text not null,
	product_product_expiration text not null,
	date_created timestamptz default now(),
	archived boolean default false
);
alter table product_data owner to ktapdasan;