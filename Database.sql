drop schema if exists paco_store cascade;
create schema paco_store;

create type paco_store.address as
(
    street      text,
    postal_code integer
);

create table paco_store.supplier
(
    supplier_id  uuid
        constraint supplier_pk
            primary key,
    name         text not null,
    phone_number text not null,
    email        text not null
);

create table paco_store.unit
(
    unit_id serial
        constraint unit_pk
            primary key,
    name    text not null
);

create table paco_store.customer
(
    customer_id  uuid
        constraint customer_pk
            primary key,
    first_name   text not null,
    last_name    text not null,
    phone_number text not null,
    rfc          text not null
);

create table paco_store.store
(
    store_id     serial
        constraint store_pk
            primary key,
    name         text not null,
    address      paco_store.address,
    phone_number text not null,
    email        text not null
);

create table paco_store.product
(
    product_id  uuid
        constraint product_pk
            primary key,
    sku         text  not null,
    name        text  not null,
    supplier_id uuid
        constraint product_supplier_fk
            references paco_store.supplier (supplier_id),
    price       money not null
);

create table paco_store.sale
(
    sale_id     uuid
        constraint sale_pk
            primary key,
    customer_id uuid
        constraint sale_customer_fk
            references paco_store.customer (customer_id),
    sale_when   timestamp with time zone not null
        default now()
);

create table paco_store.sale_detail
(
    detail_id  uuid
        constraint detail_pk
            primary key,
    product_id uuid
        constraint detail_product_fk
            references paco_store.product (product_id)
);


create table paco_store.stock
(
    store_id   integer
        constraint stock_store_fk
            references paco_store.store (store_id),
    product_id uuid
        constraint stock_product_fk
            references paco_store.product (product_id),
    balance    float not null
);