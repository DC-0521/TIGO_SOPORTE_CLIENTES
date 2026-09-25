const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  connectionString: 'postgresql://tigo_soporte_db_user:QSm6FuGFa16g75n0fYlhxXBWH6pgA6PI@dpg-dardmrfavr4c73e8mslg-a.oregon-postgres.render.com/tigo_soporte_db',
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => {
    console.log('Conectado a Render. Ejecutando SQL...');
    const sql = fs.readFileSync('tigo_soporte_db.sql', 'utf8');
    return client.query(sql);
  })
  .then(() => {
    console.log('Tablas y datos creados correctamente en Render');
    client.end();
  })
  .catch(e => {
    console.error('Error al ejecutar el script:', e);
    client.end();
  });
