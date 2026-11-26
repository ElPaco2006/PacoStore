-- drop schema if exists paco_store cascade;
--create schema paco_store;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

--GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;


-- TODO: More fields
create type address as
(
    street      text,
    postal_code integer
);

-- TODO: Proper names
create type unit as enum (
    'pieza',
    'kilo',
    'metro',
    'litro'
    );

-- Proveedor
create table supplier
(
    supplier_id  uuid
        constraint supplier_pk
            primary key default uuidv7(),
    name         text not null,
    phone_number text not null,
    email        text not null
);

-- Clientes
create table customer
(
    customer_id  uuid
        constraint customer_pk
            primary key default uuidv7(),
    first_name   text not null,
    last_name    text not null,
    phone_number text not null,
    rfc          text not null
);

-- Sucursal
create table store
(
    store_id     uuid
        constraint store_pk
            primary key default uuidv7(),
    name         text not null,
    address      address,
    phone_number text not null,
    email        text not null
);

-- Usuario
-- TODO: 'text' may not be the most efficient way to store a password hash
create table user_account
(
    user_id  uuid
        constraint user_pk
            primary key default uuidv7(),
    store_id uuid
        constraint user_store_fk
            references store (store_id),
    username text not null,
    password text not null
);

-- Productos
create table product
(
    product_id  uuid
        constraint product_pk
            primary key default uuidv7(),
    sku         text    not null,
    name        text    not null,
    supplier_id uuid
        constraint product_supplier_fk
            references supplier (supplier_id),
    price       numeric not null check ( price::numeric > 0 )
);

-- Venta
-- TODO: Rename sale_when
create table sale
(
    sale_id     uuid
        constraint sale_pk
            primary key default uuidv7(),
    customer_id uuid
        constraint sale_customer_fk
            references customer (customer_id),
    store_id    uuid
        constraint sale_store_fk
            references store (store_id),
    user_id     uuid
        constraint sale_user_fk
            references user_account (user_id),
    sale_when   timestamp with time zone not null
                        default now()
);

-- Venta detalles
create table sale_detail
(
    sale_detail_id uuid
        constraint sale_detail_pk
            primary key default uuidv7(),
    sale_id        uuid
        constraint sale_detail_sale_fk
            references sale (sale_id),
    product_id     uuid
        constraint sale_detail_product_fk
            references product (product_id),
    amount         numeric not null check ( amount > 0 ),
    price          money   not null check ( price::numeric > 0 )
);

-- Inventario
create table stock
(
    store_id   uuid
        constraint stock_store_fk
            references store (store_id),
    product_id uuid
        constraint stock_product_fk
            references product (product_id),
    balance    numeric not null,

    primary key (store_id, product_id)
);

-- Devolución
-- TODO: Possibly rename this table, rename return_when.
create table return
(
    return_id uuid
        constraint return_pk
            primary key default uuidv7(),
    sale_id   uuid
        constraint return_sale_fk
            references sale (sale_id),
    user_id   uuid
        constraint return_user_fk
            references user_account (user_id),
    sale_when timestamp with time zone not null
                        default now()
);

-- Devolución detalles
create table return_detail
(
    return_detail_id uuid
        constraint return_detail_pk
            primary key default uuidv7(),
    return_id        uuid
        constraint return_detail_return_fk
            references return (return_id),
    sale_detail_id   uuid
        constraint return_detail_sale_detail_fk
            references sale_detail (sale_detail_id),
    amount           numeric not null check ( amount > 0 )
);

-- Reabastecimiento
create table resupply
(
    resupply_id   uuid
        constraint resupply_pk
            primary key default uuidv7(),
    store         uuid
        constraint resupply_store_fk
            references store (store_id),
    product_id    uuid
        constraint resupply_product_fk
            references product (product_id),
    supplier_id   uuid
        constraint resupply_supplier_fk
            references supplier (supplier_id),
    resupply_when timestamp with time zone not null
                        default now(),
    amount        numeric                  not null check ( amount > 0 )
);

INSERT INTO supplier (name, phone_number, email)
VALUES ('TRUPER', '', 'contact@truper.com'),
       ('PRETUL', '', 'contact@pretul.com');

INSERT INTO product (sku, name, price, supplier_id)
VALUES ('MACH-18X', 'Machete doble filo 18"', 200, (SELECT supplier_id FROM supplier WHERE name = 'TRUPER')),
       ('TRU-001', 'Martillo de uña', 185.00, (SELECT supplier_id FROM supplier WHERE name = 'TRUPER')),
       ('TRU-002', 'Pinzas de presión', 145.00, (SELECT supplier_id FROM supplier WHERE name = 'TRUPER')),
       ('TRU-003', 'Desarmador plano', 65.00, (SELECT supplier_id FROM supplier WHERE name = 'TRUPER')),
       ('TRU-004', 'Desarmador Phillips', 70.00, (SELECT supplier_id FROM supplier WHERE name = 'TRUPER')),
       ('TRU-005', 'Cinta métrica 5m', 95.00, (SELECT supplier_id FROM supplier WHERE name = 'TRUPER')),
       ('TRU-006', 'Nivel de aluminio', 220.00, (SELECT supplier_id FROM supplier WHERE name = 'TRUPER')),
       ('TRU-007', 'Llave ajustable', 180.00, (SELECT supplier_id FROM supplier WHERE name = 'TRUPER')),
       ('TRU-008', 'Arco para segueta', 130.00, (SELECT supplier_id FROM supplier WHERE name = 'TRUPER')),

       ('PRE-001', 'Martillo de bola', 120.00, (SELECT supplier_id FROM supplier WHERE name = 'PRETUL')),
       ('PRE-002', 'Pinzas universales', 85.00, (SELECT supplier_id FROM supplier WHERE name = 'PRETUL')),
       ('PRE-003', 'Juego de desarmadores', 160.00, (SELECT supplier_id FROM supplier WHERE name = 'PRETUL')),
       ('PRE-004', 'Cinta métrica 3m', 55.00, (SELECT supplier_id FROM supplier WHERE name = 'PRETUL')),
       ('PRE-005', 'Llave española', 90.00, (SELECT supplier_id FROM supplier WHERE name = 'PRETUL')),
       ('PRE-006', 'Cutter metálico', 45.00, (SELECT supplier_id FROM supplier WHERE name = 'PRETUL')),
       ('PRE-007', 'Lima para metal', 75.00, (SELECT supplier_id FROM supplier WHERE name = 'PRETUL')),
       ('PRE-008', 'Segueta manual', 65.00, (SELECT supplier_id FROM supplier WHERE name = 'PRETUL'));