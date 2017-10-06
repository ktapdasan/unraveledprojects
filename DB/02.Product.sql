create table product_data
(
	pk serial primary key,
	product_name text not null,
	product_bar_code text not null,
	product_stocks int not null,
	product_srp text not null,
	product_price text not null,
	product_supplier text not null,
	product_product_expiration text not null,
	date_created timestamptz default now(),
	archived boolean default false
);
alter table product_data owner to ktapdasan;

--sept 25,2017
alter table product_data add column product_receipt_name text;

--sept 29,2017
alter table product_data add column product_status text;

--oct 6,2017
alter table product_data add column product_or_number text;


create table supplier_data
(
	pk serial primary key,
	supplier_name text not null,
	supplier_address text not null,
	supplier_contact_number text not null,
	supplier_contact_person text not null,
	supplier_code_name text not null,
	date_created timestamptz default now(),
	archived boolean default false
);
alter table supplier_data owner to ktapdasan;

--sept 29,2017
alter table supplier_data alter column supplier_contact_number type text ;

create table request_order_data
(
	pk serial primary key,
	product_finalnumber text not null,
	product_quantity text not null,
	product_date_needed text not null,
	product_market_price text not null,
	product_pk text not null,
	status text default 'Pending',
	date_created timestamptz default now(),
	archived boolean default false
);
alter table request_order_data owner to ktapdasan;

--sept 22,2017
alter table request_order_data add column product_name text;

create table tender_data
(
	pk serial primary key,
	product_name text not null,
	product_quantity int not null,
	product_supplier_price text not null,
	product_retail_price text not null,
	product_transaction_number text not null,
	vat_percentage text not null,
	net_amount text not null,
	vat text not null,
	discount text not null,
	change text not null,
	cash text not null,
	tempo_total text not null,
	void_count text not null,
	total text not null,
	gc_amount text not null,
	gc_name text not null,
	gc_code text not null,
	cashier_user_id text not null,
	date_created timestamptz default now(),
	archived boolean default false
);
alter table tender_data owner to ktapdasan;

create table gift_certificate_data
(
	pk serial primary key,
	gc_name text not null,
	gc_code text not null,
	gc_amount text not null,
	cashier_user_id int not null,
	date_created timestamptz default now(),
	archived boolean default false
);
alter table gift_certificate_data owner to ktapdasan;

create table added_user_data
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
alter table added_user_data owner to ktapdasan;