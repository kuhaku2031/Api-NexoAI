CREATE TABLE Categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    precio_compra NUMERIC(10, 2) NOT NULL,
    precio_venta NUMERIC(10, 2) NOT NULL,
    categoria_id INT,
    cantidad_stock INT NOT NULL,
    imagen_url VARCHAR(255),
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
);

CREATE TABLE PuntosVenta (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255)
);

CREATE TABLE Ventas (
    id SERIAL PRIMARY KEY,
    metodo_pago INT NOT NULL,
    descuento NUMERIC(10, 2),
    total NUMERIC(10, 2) NOT NULL,
    punto_venta_id INT NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    FOREIGN KEY (metodo_pago) REFERENCES MetodosPago(id)
    FOREIGN KEY (punto_venta_id) REFERENCES PuntosVenta(id);
);

CREATE TABLE DetallesVentas (
    id SERIAL PRIMARY KEY,
    venta_id INT,
    producto_id INT,
    cantidad_vendida INT NOT NULL,
    precio_venta NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES Ventas(id),
    FOREIGN KEY (producto_id) REFERENCES Productos(id)
);

CREATE TABLE Pagos (    
    id SERIAL PRIMARY KEY,
    venta_id INT,
    monto_total NUMERIC(10, 2) NOT NULL,
    punto_venta_id INT,
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venta_id) REFERENCES Ventas(id),
    FOREIGN KEY (punto_venta_id) REFERENCES PuntosVenta(id)
);

CREATE TABLE PagosDetallados (
    id SERIAL PRIMARY KEY,
    pago_id INT,
    metodo_pago INT NOT NULL,
    monto NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (pago_id) REFERENCES Pagos(id),
    FOREIGN KEY (metodo_pago) REFERENCES MetodosPago(id)
);


CREATE TABLE MetodosPago (
    id SERIAL PRIMARY KEY,
    metodo VARCHAR(20) NOT NULL
);



INSERT INTO TABLE Categorias (nombre) VALUES ('Comida'),('Aseo'),('Nevera')

INSERT INTO Productos (nombre, codigo, precio_compra, precio_venta, categoria_id, cantidad_stock, imagen_url)
VALUES ('Cocacola-retornable', 'CO12345', 1500, 2100, 3, 50, 'http://example.com/smartphone.jpg');


--PAGO SENCILLOS
-- Insertar una venta
INSERT INTO Ventas (metodo_pago, descuento, total)
VALUES ('Efectivo', 0, 100.00);

-- Obtener el ID de la venta recién insertada
SELECT currval(pg_get_serial_sequence('Ventas', 'id'));

-- Insertar los detalles de la venta
INSERT INTO DetallesVentas (producto_id, cantidad_vendida, precio_venta)
VALUES (venta_id, 1, 3, 30.00), (venta_id, 2, 5, 50.00), (venta_id, 3, 2, 20.00);

-- Insertar el pago
INSERT INTO Pagos (metodo_pago, monto)
VALUES (1, 'Efectivo', 100.00);

--PAGO MIXTO
-- Insertar una venta
INSERT INTO Ventas (metodo_pago, descuento, total)
VALUES ('Mixto', 0, 100.00);

-- Obtener el ID de la venta recién insertada
SELECT currval(pg_get_serial_sequence('Ventas', 'id')) into venta_id;

-- Insertar los detalles de la venta
INSERT INTO DetallesVentas (venta_id, producto_id, cantidad_vendida, precio_venta)
VALUES (venta_id, 2, 2, 40.00), (venta_id, 3, 2 , 60.00);

-- Insertar los pagos
INSERT INTO Pagos (venta_id,metodo_pago, monto)
VALUES (venta_id,'Nequi', 30.00), (venta_id,'Efectivo', 70.00);

-- Consultas
-- Obtener el total de ventas
SELECT metodo_pago, SUM(monto) AS total_vendido
FROM Pagos
GROUP BY metodo_pago;

-- Consultas
-- Obtener el total de ventas de cada metodo de pago
SELECT metodo_pago, SUM(monto) AS total_vendido
FROM Pagos
WHERE venta_id IN (SELECT id FROM Ventas WHERE metodo_pago = 'Mixto')
GROUP BY metodo_pago;

SELECT metodo_pago, SUM(monto) AS total_nequi
FROM Pagos
WHERE metodo_pago = 'Nequi';
