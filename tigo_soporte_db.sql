-- 1. TABLA DE CLIENTES (Customer-Service)
CREATE TABLE clientes (
    id VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    identificacion VARCHAR(13) UNIQUE NOT NULL,
    estado_cuenta VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA DE SERVICIOS CONTRATADOS (Customer-Service)
CREATE TABLE servicios_contratados (
    id SERIAL PRIMARY KEY,
    cliente_id VARCHAR(20) REFERENCES clientes(id) ON DELETE CASCADE,
    tipo_servicio VARCHAR(50) NOT NULL,
    numero_cuenta VARCHAR(30) NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVO'
);

-- 3. TABLA DE TICKETS DE SOPORTE (Ticket-Service)
CREATE TABLE tickets (
    id VARCHAR(20) PRIMARY KEY,
    cliente_id VARCHAR(20) NOT NULL,
    servicio_afectado VARCHAR(50) NOT NULL,
    tipo_incidencia VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    prioridad VARCHAR(20) DEFAULT 'MEDIA',
    estado VARCHAR(20) DEFAULT 'ABIERTO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de prueba para la demostración
INSERT INTO clientes (id, nombre, identificacion, estado_cuenta) 
VALUES ('CLI-101', 'Juan Pérez', '0928374651', 'ACTIVO'),
       ('CLI-102', 'Maria Lopez', '1712345678', 'SUSPENDIDO');

INSERT INTO servicios_contratados (cliente_id, tipo_servicio, numero_cuenta) 
VALUES ('CLI-101', 'INTERNET_FIBRA', 'CNT-8821'),
       ('CLI-101', 'LINEA_MOVIL', 'MOV-099123456');