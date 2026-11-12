drop schema if exists paco_store cascade;
create schema paco_store;

-- TODO: More fields
create type paco_store.address as
    (
    street text,
    postal_code integer
    );

-- TODO: Proper names
create type paco_store.unit as enum (
    'pieza',
    'kilo',
    'metro',
    'litro'
);

-- Proveedor
create table paco_store.supplier
(
    supplier_id  uuid
        constraint supplier_pk
            primary key,
    name         text not null,
    phone_number text not null,
    email        text not null
);

-- Clientes
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

-- Sucursal
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

-- Productos
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

-- Venta
-- TODO: Rename sale_when
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

-- Venta detalles
create table paco_store.sale_detail
(
    sale_detail_id  uuid
        constraint sale_detail_pk
            primary key,
    product_id uuid
        constraint sale_detail_product_fk
            references paco_store.product (product_id),
    amount     float not null,
    price      money not null
);

-- Inventario
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

-- Devolución
-- TODO: Possibly rename this table, rename return_when.
create table paco_store.return
(
    return_id uuid
        constraint return_pk
            primary key,
    sale_id uuid
        constraint return_sale_fk
            references paco_store.sale (sale_id),
    sale_when   timestamp with time zone not null
        default now()
);

-- Devolución detalles
create table paco_store.return_detail
(
    return_detail_id  uuid
        constraint return_detail_pk
            primary key,
    sale_detail_id uuid
        constraint return_detail_sale_detail_fk
            references paco_store.sale_detail (sale_detail_id),
    amount     float not null
);