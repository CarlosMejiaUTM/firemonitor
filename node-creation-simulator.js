// Usamos la sintaxis 'import' en lugar de 'require'
import axios from 'axios';
import admin from 'firebase-admin';
import bcrypt from 'bcrypt';
import fs from 'fs';

const API_URL = 'http://localhost:3000';

// --- DATOS DE PRUEBA ---
const ADMIN_CREDS = { usuario: 'admin', contrasena: 'admin12345' };

const USERS_TO_CREATE = [
  { nombre: 'Ana', apellido: 'Salas', usuario: 'asalas', correo: 'ana@email.com', contrasena: 'password123' },
  { nombre: 'Beto', apellido: 'Gomez', usuario: 'bgomez', correo: 'beto@email.com', contrasena: 'password123' },
];

const NODES_TO_CREATE = [
  { nombre: 'Sensor Finca de Ana', tipo: 'sensor', coordenadas: { lat: 20.97, lng: -89.62 } },
  { nombre: 'Repetidor Finca de Ana', tipo: 'repetidor', coordenadas: { lat: 20.98, lng: -89.63 } },
  { nombre: 'Sensor Rancho de Beto', tipo: 'sensor', coordenadas: { lat: 20.95, lng: -89.60 } },
  { nombre: 'Central de Beto', tipo: 'central', coordenadas: { lat: 20.94, lng: -89.59 } },
];
// --------------------

const serviceAccount = JSON.parse(fs.readFileSync('./gcp-credentials.json', 'utf8'));

// --- Inicialización de Firebase ---
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
const db = admin.firestore();
// ---------------------------

const api = axios.create({ baseURL: API_URL });

/**
 * Registra un nuevo usuario.
 */
async function registerUser(userData) {
  try {
    console.log(`- Registrando usuario: ${userData.usuario}...`);
    const response = await api.post('/auth/register', userData);
    console.log(`  ✅ Usuario '${userData.usuario}' creado con ID: ${response.data.id}`);
    // Suponiendo que la API devuelve el usuario completo con su ID
    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      console.log(`  ⚠️  El usuario '${userData.usuario}' ya existe.`);
      try {
        const loginRes = await axios.post(`${API_URL}/auth/login`, { usuario: userData.usuario, contrasena: userData.contrasena });
        const token = loginRes.data.access_token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { id: payload.sub, ...userData };
      } catch (loginError) {
        return null;
      }
    }
    console.error(`  ❌ Error registrando a ${userData.usuario}:`, error.response?.data?.message);
    return null;
  }
}

/**
 * Inicia sesión como admin y configura el token en axios.
 */
async function loginAsAdmin() {
  try {
    console.log('\nIniciando sesión como admin...');
    const response = await api.post('/auth/login', ADMIN_CREDS);
    const token = response.data.access_token;
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    console.log('✅ Sesión de admin iniciada.');
    return true;
  } catch (error) {
    console.error('❌ Error fatal: No se pudo iniciar sesión como admin. Verifica las credenciales.');
    return false;
  }
}

/**
 * Crea un nodo y se lo asigna a un usuario.
 */
async function createAndAssignNode(nodeData, ownerId) {
  try {
    const payload = { ...nodeData, userId: ownerId };
    console.log(`- Creando nodo '${nodeData.nombre}' para el usuario ${ownerId}...`);
    const response = await api.post('/nodes', payload);
    console.log(`  ✅ Nodo '${nodeData.nombre}' creado con ID: ${response.data.id}`);
  } catch (error) {
    console.error(`  ❌ Error creando el nodo '${nodeData.nombre}':`, error.response?.data?.message);
  }
}

/**
 * Función principal que orquesta todo.
 */
async function run() {
  console.log('--- Iniciando Simulador de Creación de Nodos ---');

  const createdUsers = await Promise.all(USERS_TO_CREATE.map(registerUser));
  const validUsers = createdUsers.filter(u => u);

  if (validUsers.length === 0) {
    console.log('No se pudieron crear o verificar usuarios. Abortando.');
    return;
  }

  const isAdminLoggedIn = await loginAsAdmin();
  if (!isAdminLoggedIn) return;

  console.log('\nAsignando nodos a usuarios...');
  for (let i = 0; i < NODES_TO_CREATE.length; i++) {
    const node = NODES_TO_CREATE[i];
    const user = validUsers[i % validUsers.length];
    await createAndAssignNode(node, user.id);
  }
  
  console.log('\n--- Simulación de creación finalizada ---');
}

run();