// tests/complex_test.spec.js
const { test, expect } = require('@playwright/test');
const { callService } = require('../utils/api_helper');

// Microservices (à modifier ensuite !)
const HUB_SERVICE_URL = 'https://dummyjson.com/products/1';
const TEST_MANAGEMENT_SERVICE_URL = 'https://dummyjson.com/products/2';
const LINUX_CONTAINER_SERVICE_URL = 'https://dummyjson.com/products/3';
const LOG_MANAGEMENT_SERVICE_URL = 'https://dummyjson.com/products/4';

test('Vérifier communication avec microservices', async () => {

  const hubResponse = await callService(HUB_SERVICE_URL);
  expect(hubResponse).toBeDefined();

  const testManagementResponse = await callService(TEST_MANAGEMENT_SERVICE_URL);
  expect(testManagementResponse).toBeDefined();

  const containerResponse = await callService(LINUX_CONTAINER_SERVICE_URL);
  expect(containerResponse).toBeDefined();

  const logsResponse = await callService(LOG_MANAGEMENT_SERVICE_URL);
  expect(logsResponse).toBeDefined();

});
