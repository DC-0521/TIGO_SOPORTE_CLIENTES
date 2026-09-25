# 📶 TIGO - Sistema Distribuido de Soporte a Clientes

Plataforma basada en arquitectura de microservicios desarrollada en **Node.js / Express**, con persistencia en **PostgreSQL**, para la gestión e integración de incidencias operativas de **TIGO**.

---

## 🚀 Tecnologías

* **Backend:** Node.js, Express.js
* **Base de Datos:** PostgreSQL
* **Comunicación Inter-servicio:** HTTP / REST mediante Axios
* **Patrón:** Arquitectura limpia en capas (Controllers, Models, Routes, Services)

---

## 📂 Microservicios

```text
tigo-soporte-clientes/
├── customer-service/  # Microservicio de Clientes (Puerto 3002)
└── ticket-service/    # Microservicio de Tickets (Puerto 3001)
```

---

## 📡 Endpoints de la API

### Customer-Service

| Método | Endpoint             | Descripción                                |
| ------ | -------------------- | ------------------------------------------ |
| `GET`  | `/api/customers`     | Obtener lista de clientes.                 |
| `GET`  | `/api/customers/:id` | Consultar cliente y servicios contratados. |
| `POST` | `/api/customers`     | Registrar un nuevo cliente.                |

### Ticket-Service

| Método | Endpoint                           | Descripción                                                                  |
| ------ | ---------------------------------- | ---------------------------------------------------------------------------- |
| `POST` | `/api/tickets`                     | Valida la existencia y estado del cliente mediante Axios y genera un ticket. |
| `GET`  | `/api/tickets`                     | Consultar todos los tickets.                                                 |
| `GET`  | `/api/tickets/cliente/:cliente_id` | Consultar el historial de tickets por cliente.                               |
| `PUT`  | `/api/tickets/:id`                 | Actualizar el estado o prioridad de un ticket.                               |

---

## 🗄️ Esquema de Base de Datos

```sql
CREATE DATABASE tigo_soporte_db;

CREATE TABLE clientes (
    id VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    identificacion VARCHAR(13) UNIQUE NOT NULL,
    estado_cuenta VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicios_contratados (
    id SERIAL PRIMARY KEY,
    cliente_id VARCHAR(20) REFERENCES clientes(id) ON DELETE CASCADE,
    tipo_servicio VARCHAR(50) NOT NULL,
    numero_cuenta VARCHAR(30) NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVO'
);

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
```

---

## ⚡ Instalación y Ejecución

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/TU_USUARIO/tigo-soporte-clientes.git
cd tigo-soporte-clientes/customer-service
npm install

cd ../ticket-service
npm install
```

### 2. Variables de entorno

Configura las variables de entorno `.env` correspondientes en cada microservicio:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=tigo_soporte_db
PORT=3002
```

Para **Ticket-Service**, utiliza el puerto correspondiente:

```env
PORT=3001
```

### 3. Iniciar los servicios

#### Customer-Service

```bash
cd customer-service
npm start
```

Puerto:

```text
http://localhost:3002
```

#### Ticket-Service

```bash
cd ticket-service
npm start
```

Puerto:

```text
http://localhost:3001
```

---

## 🔄 Comunicación entre Microservicios

El sistema utiliza comunicación **HTTP/REST mediante Axios**.

El flujo principal para la creación de un ticket es:

```text
Cliente / Postman
       │
       │ POST /api/tickets
       ▼
┌───────────────────┐
│   Ticket-Service  │
│     Puerto 3001   │
└─────────┬─────────┘
          │
          │ GET /api/customers/:id
          │ Axios
          ▼
┌───────────────────┐
│ Customer-Service  │
│     Puerto 3002   │
└─────────┬─────────┘
          │
          │ Consulta cliente
          ▼
     PostgreSQL
```

El **Ticket-Service** verifica previamente la existencia y el estado del cliente utilizando el **Customer-Service** antes de registrar una incidencia.

---

## 🏗️ Arquitectura del Sistema

```text
                    ┌──────────────────┐
                    │      Cliente     │
                    │    / Postman     │
                    └────────┬─────────┘
                             │
                       HTTP / REST
                             │
              ┌──────────────▼──────────────┐
              │       Ticket-Service        │
              │          Puerto 3001        │
              │                             │
              │ Controllers                 │
              │ Services                    │
              │ Models                      │
              │ Routes                      │
              └──────────────┬──────────────┘
                             │
                          Axios
                             │
              ┌──────────────▼──────────────┐
              │      Customer-Service       │
              │          Puerto 3002        │
              │                             │
              │ Controllers                 │
              │ Services                    │
              │ Models                      │
              │ Routes                      │
              └──────────────┬──────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │ tigo_soporte_db │
                    └─────────────────┘
```

---

## 📌 Resumen

El sistema **TIGO - Sistema Distribuido de Soporte a Clientes** implementa una arquitectura de microservicios utilizando:

* **Node.js y Express.js** para el desarrollo de los servicios.
* **PostgreSQL** para la persistencia de datos.
* **Axios** para la comunicación entre microservicios.
* **REST API** para la exposición de endpoints.
* **Arquitectura en capas** para organizar Controllers, Models, Routes y Services.
* **Customer-Service** para la gestión de clientes y servicios contratados.
* **Ticket-Service** para la creación y administración de incidencias.

Esta arquitectura permite separar las responsabilidades del sistema y facilitar su mantenimiento, escalabilidad e integración.
