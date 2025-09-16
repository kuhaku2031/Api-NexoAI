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



-- =============================================
-- LOCALAI - ESQUEMA COMPLETO POSTGRESQL
-- Arquitectura Multi-Tenant Escalable
-- =============================================

-- EXTENSIONES NECESARIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para búsquedas full-text

-- =============================================
-- 1. TABLA EMPRESAS/ORGANIZACIONES (TENANTS)
-- =============================================

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100), -- 'retail', 'restaurant', 'pharmacy', etc.
    tax_id VARCHAR(50) UNIQUE, -- NIT/RUT
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Colombia',
    
    -- Configuración de la empresa
    currency VARCHAR(3) DEFAULT 'COP',
    timezone VARCHAR(50) DEFAULT 'America/Bogota',
    date_format VARCHAR(20) DEFAULT 'DD/MM/YYYY',
    
    -- Estados y control
    is_active BOOLEAN DEFAULT true,
    trial_ends_at TIMESTAMP,
    subscription_status VARCHAR(20) DEFAULT 'trial', -- 'trial', 'active', 'suspended', 'canceled'
    subscription_tier VARCHAR(20) DEFAULT 'starter', -- 'starter', 'professional', 'enterprise'
    max_users INTEGER DEFAULT 3,
    max_points_sale INTEGER DEFAULT 1,
    ai_queries_limit INTEGER DEFAULT 50,
    
    -- Auditoria
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 2. USUARIOS Y AUTENTICACIÓN
-- =============================================

CREATE TYPE user_role AS ENUM ('owner', 'manager', 'employee');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Información personal
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    
    -- Autenticación
    password_hash VARCHAR(255) NOT NULL,
    email_verified_at TIMESTAMP,
    
    -- Roles y permisos
    role user_role NOT NULL DEFAULT 'employee',
    permissions JSONB DEFAULT '{}', -- Permisos granulares adicionales
    
    -- Control de acceso
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP,
    login_count INTEGER DEFAULT 0,
    
    -- Configuraciones personales
    preferences JSONB DEFAULT '{}', -- tema, idioma, notificaciones, etc.
    
    -- Auditoria
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Índices únicos por tenant
    UNIQUE(company_id, email)
);

-- =============================================
-- 3. PUNTOS DE VENTA
-- =============================================

CREATE TABLE point_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50), -- Código interno de la tienda
    description TEXT,
    
    -- Ubicación
    address TEXT,
    city VARCHAR(100),
    coordinates POINT, -- Para geolocalización
    
    -- Configuración
    is_active BOOLEAN DEFAULT true,
    opening_hours JSONB, -- Horarios de apertura por día
    
    -- Auditoria
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(company_id, code)
);

-- =============================================
-- 4. CATEGORÍAS DE PRODUCTOS
-- =============================================

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7), -- Color hex para UI
    icon VARCHAR(50), -- Nombre del ícono
    
    -- Jerarquía (para subcategorías)
    parent_id UUID REFERENCES categories(id),
    
    -- Control
    is_active BOOLEAN DEFAULT true,
    
    -- Auditoria
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(company_id, name)
);

-- =============================================
-- 5. PRODUCTOS
-- =============================================

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    
    -- Información básica
    name VARCHAR(255) NOT NULL,
    description TEXT,
    barcode VARCHAR(255), -- Código de barras
    sku VARCHAR(100), -- Stock Keeping Unit
    
    -- Precios
    purchase_price DECIMAL(12,2) NOT NULL DEFAULT 0,
    selling_price DECIMAL(12,2) NOT NULL,
    min_price DECIMAL(12,2), -- Precio mínimo permitido
    
    -- Inventario
    stock_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 5, -- Alerta de stock bajo
    max_stock_level INTEGER, -- Stock máximo
    
    -- Configuración
    is_active BOOLEAN DEFAULT true,
    track_inventory BOOLEAN DEFAULT true,
    allow_negative_stock BOOLEAN DEFAULT false,
    
    -- Impuestos
    tax_rate DECIMAL(5,2) DEFAULT 0, -- Porcentaje de impuesto
    
    -- Multimedia
    images JSONB DEFAULT '[]', -- URLs de imágenes
    
    -- Auditoria
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(company_id, barcode),
    UNIQUE(company_id, sku)
);

-- =============================================
-- 6. VENTAS
-- =============================================

CREATE TYPE sale_status AS ENUM ('completed', 'refunded', 'partially_refunded');

CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    point_sale_id UUID NOT NULL REFERENCES point_sales(id),
    user_id UUID NOT NULL REFERENCES users(id), -- Quien realizó la venta
    
    -- Información de venta
    sale_number VARCHAR(50) NOT NULL, -- Número consecutivo por punto de venta
    
    -- Montos
    subtotal DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    
    -- Información del cliente (opcional)
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    customer_document VARCHAR(50),
    
    -- Estado y control
    status sale_status DEFAULT 'completed',
    notes TEXT,
    
    -- Auditoria
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(company_id, point_sale_id, sale_number)
);

-- =============================================
-- 7. DETALLES DE VENTA
-- =============================================

CREATE TABLE sale_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    
    -- Información del producto al momento de la venta
    product_name VARCHAR(255) NOT NULL, -- Snapshot del nombre
    product_sku VARCHAR(100), -- Snapshot del SKU
    
    -- Cantidades y precios
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL, -- Precio unitario al momento de venta
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    line_total DECIMAL(12,2) NOT NULL, -- quantity * unit_price - discount + tax
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 8. PAGOS
-- =============================================

CREATE TYPE payment_method AS ENUM ('cash', 'card', 'transfer', 'digital_wallet', 'credit');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    
    method payment_method NOT NULL,
    status payment_status DEFAULT 'completed',
    amount DECIMAL(12,2) NOT NULL,
    
    -- Información adicional del pago
    reference_number VARCHAR(100), -- Número de referencia bancaria
    card_last_digits VARCHAR(4), -- Últimos 4 dígitos de tarjeta
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 9. SESIONES DE TRABAJO
-- =============================================

CREATE TABLE work_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    point_sale_id UUID NOT NULL REFERENCES point_sales(id),
    
    -- Tiempo
    clock_in TIMESTAMP NOT NULL,
    clock_out TIMESTAMP,
    total_hours INTERVAL, -- Calculado automáticamente
    
    -- Métricas de la sesión
    sales_count INTEGER DEFAULT 0,
    total_sales_amount DECIMAL(12,2) DEFAULT 0,
    
    -- Estado
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 10. INTELIGENCIA ARTIFICIAL - CONVERSACIONES
-- =============================================

CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    point_sale_id UUID REFERENCES point_sales(id),
    
    title VARCHAR(255), -- Título generado automáticamente
    context_type VARCHAR(50), -- 'sales', 'inventory', 'analytics', 'general'
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant'
    content TEXT NOT NULL,
    
    -- Metadatos de IA
    model_used VARCHAR(50), -- 'gpt-4', 'gpt-3.5-turbo', etc.
    tokens_used INTEGER,
    response_time_ms INTEGER,
    
    -- Contexto adicional
    context_data JSONB, -- Datos que se enviaron a la IA
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 11. INSIGHTS Y REPORTES DE IA
-- =============================================

CREATE TYPE insight_type AS ENUM ('sales_trend', 'inventory_alert', 'customer_behavior', 'performance', 'prediction');

CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    point_sale_id UUID REFERENCES point_sales(id),
    
    type insight_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Datos del insight
    insight_data JSONB NOT NULL, -- Datos estructurados del insight
    confidence_score DECIMAL(3,2), -- 0.00 - 1.00
    
    -- Acciones recomendadas
    recommended_actions JSONB,
    
    -- Control
    is_read BOOLEAN DEFAULT false,
    is_important BOOLEAN DEFAULT false,
    expires_at TIMESTAMP, -- Algunos insights pueden expirar
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 12. CONFIGURACIÓN DEL SISTEMA
-- =============================================

CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    setting_key VARCHAR(100) NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(company_id, setting_key)
);

-- =============================================
-- 13. LOGS DE AUDITORÍA
-- =============================================

CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'login', 'logout', 'export');

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    
    table_name VARCHAR(50) NOT NULL,
    record_id UUID,
    action audit_action NOT NULL,
    
    -- Datos del cambio
    old_values JSONB,
    new_values JSONB,
    
    -- Contexto
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================

-- Índices por company_id (fundamentales para multi-tenancy)
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_point_sales_company_id ON point_sales(company_id);
CREATE INDEX idx_products_company_id ON products(company_id);
CREATE INDEX idx_sales_company_id ON sales(company_id);
CREATE INDEX idx_categories_company_id ON categories(company_id);

-- Índices para consultas frecuentes
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_sales_point_sale_id ON sales(point_sale_id);
CREATE INDEX idx_sales_user_id ON sales(user_id);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_name_trgm ON products USING gin(name gin_trgm_ops);

-- Índices para IA
CREATE INDEX idx_ai_conversations_company_id ON ai_conversations(company_id);
CREATE INDEX idx_ai_messages_conversation_id ON ai_messages(conversation_id);
CREATE INDEX idx_ai_insights_company_id ON ai_insights(company_id);
CREATE INDEX idx_ai_insights_type ON ai_insights(type);

-- =============================================
-- TRIGGERS PARA AUTOMATIZACIÓN
-- =============================================

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger a todas las tablas necesarias
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_point_sales_updated_at BEFORE UPDATE ON point_sales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sales_updated_at BEFORE UPDATE ON sales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para generar números de venta consecutivos
CREATE OR REPLACE FUNCTION generate_sale_number()
RETURNS TRIGGER AS $$
DECLARE
    next_number INTEGER;
BEGIN
    -- Obtener el siguiente número para este punto de venta
    SELECT COALESCE(MAX(CAST(sale_number AS INTEGER)), 0) + 1 
    INTO next_number
    FROM sales 
    WHERE company_id = NEW.company_id 
    AND point_sale_id = NEW.point_sale_id
    AND sale_number ~ '^[0-9]+$'; -- Solo números
    
    NEW.sale_number = next_number::TEXT;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER generate_sale_number_trigger 
    BEFORE INSERT ON sales 
    FOR EACH ROW 
    WHEN (NEW.sale_number IS NULL)
    EXECUTE FUNCTION generate_sale_number();

-- =============================================
-- FUNCIONES ÚTILES
-- =============================================

-- Función para obtener el stock actual de un producto
CREATE OR REPLACE FUNCTION get_current_stock(product_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    current_stock INTEGER;
BEGIN
    SELECT 
        p.stock_quantity - COALESCE(
            (SELECT SUM(sd.quantity) 
             FROM sale_details sd 
             JOIN sales s ON sd.sale_id = s.id 
             WHERE sd.product_id = product_uuid 
             AND s.status = 'completed'
             AND s.created_at > p.updated_at), 0
        )
    INTO current_stock
    FROM products p
    WHERE p.id = product_uuid;
    
    RETURN COALESCE(current_stock, 0);
END;
$$ language 'plpgsql';

-- =============================================
-- VISTAS ÚTILES PARA REPORTES
-- =============================================

-- Vista de ventas con información completa
CREATE VIEW sales_detailed AS
SELECT 
    s.id,
    s.company_id,
    c.company_name,
    ps.name AS point_sale_name,
    u.first_name || ' ' || u.last_name AS seller_name,
    s.sale_number,
    s.total_amount,
    s.sale_date,
    s.status
FROM sales s
JOIN companies c ON s.company_id = c.id
JOIN point_sales ps ON s.point_sale_id = ps.id
JOIN users u ON s.user_id = u.id;

-- Vista de productos con stock bajo
CREATE VIEW low_stock_products AS
SELECT 
    p.*,
    c.company_name,
    cat.name AS category_name
FROM products p
JOIN companies c ON p.company_id = c.id
LEFT JOIN categories cat ON p.category_id = cat.id
WHERE p.stock_quantity <= p.min_stock_level
AND p.is_active = true;

-- =============================================
-- DATOS DE EJEMPLO PARA DESARROLLO
-- =============================================

-- Insertar empresa de ejemplo
INSERT INTO companies (company_name, business_type, email, phone, address, city) 
VALUES ('Tienda La Esquina', 'retail', 'info@laesquina.com', '+57 300 123 4567', 'Calle 123 #45-67', 'Bogotá');

-- Obtener ID de la empresa para los siguientes inserts
-- Usar este ID en lugar de los UUID de ejemplo en producción