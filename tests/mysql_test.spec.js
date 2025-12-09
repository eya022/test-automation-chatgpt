// tests/mysql_test.spec.js
const { test, expect } = require('@playwright/test');
const { createConnection } = require('../utils/db_connection');

test('Vérifier création entité dans MySQL', async () => {
  const connection = await createConnection();

  // 🔹 1) Insertion d'une entité
  const [insert] = await connection.execute(
    "INSERT INTO test_entities (name) VALUES (?)",
    ["entity_from_test"]
  );

  expect(insert.affectedRows).toBe(1);

  // 🔹 2) Vérification qu’elle existe
  const [rows] = await connection.execute(
    "SELECT * FROM test_entities WHERE name = ?",
    ["entity_from_test"]
  );

  expect(rows.length).toBeGreaterThan(0);
  console.log("✔ Donnée trouvée :", rows);

  await connection.end();
});
