import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('pharmacy.db');

const runQuery = (query, params = []) => new Promise((resolve, reject) => {
  database.transaction((tx) => {
    tx.executeSql(
      query,
      params,
      (_, result) => resolve(result),
      (_, error) => {
        reject(error);
        return false;
      }
    );
  });
});

export const initDatabase = async () => {
  await runQuery(`
    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      manufacturer TEXT,
      expiryDate TEXT,
      quantity INTEGER DEFAULT 0,
      lot TEXT,
      barcode TEXT
    );
  `);

  await runQuery(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      medicationId INTEGER NOT NULL,
      type TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      reason TEXT,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (medicationId) REFERENCES medications(id)
    );
  `);
};

export const fetchMedications = async () => {
  const result = await runQuery('SELECT * FROM medications ORDER BY name ASC');
  return result.rows._array;
};

export const insertMedication = async ({ name, category, manufacturer, expiryDate, quantity, lot, barcode }) => {
  return runQuery(
    `INSERT INTO medications (name, category, manufacturer, expiryDate, quantity, lot, barcode) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, category, manufacturer, expiryDate, quantity, lot, barcode]
  );
};

export const updateMedicationQuantity = async (id, quantity) => {
  return runQuery('UPDATE medications SET quantity = ? WHERE id = ?', [quantity, id]);
};

export const fetchTransactions = async () => {
  const result = await runQuery(`
    SELECT t.id, t.medicationId, t.type, t.quantity, t.reason, t.timestamp, m.name as medicationName
    FROM transactions t
    JOIN medications m ON m.id = t.medicationId
    ORDER BY datetime(t.timestamp) DESC
  `);
  return result.rows._array;
};

export const fetchTransactionsByPeriod = async (startDate, endDate) => {
  const result = await runQuery(
    `
      SELECT t.id, t.medicationId, t.type, t.quantity, t.reason, t.timestamp, m.name as medicationName
      FROM transactions t
      JOIN medications m ON m.id = t.medicationId
      WHERE date(t.timestamp) BETWEEN date(?) AND date(?)
      ORDER BY datetime(t.timestamp) DESC
    `,
    [startDate, endDate]
  );
  return result.rows._array;
};

export const insertTransaction = async ({ medicationId, type, quantity, reason, timestamp }) => {
  return runQuery(
    `INSERT INTO transactions (medicationId, type, quantity, reason, timestamp) VALUES (?, ?, ?, ?, ?)`
    , [medicationId, type, quantity, reason, timestamp]
  );
};
