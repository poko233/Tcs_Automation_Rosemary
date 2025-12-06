import { test, expect } from '@playwright/test';

const HOST = 'https://servineo.app'; // URL Produccion
// const HOST = 'https://servineo-frontend-bytes-bandidos.vercel.app';
// const HOST = 'http://localhost:3000';

const TRACKING_URL = `${HOST}/es/tracking-appointments`;

test('TC - Verificar consulta de citas en un rango de tiempo definido en tracking-appointments', async ({ page }) => {
  await page.goto(TRACKING_URL, { waitUntil: 'networkidle' });

  await page.fill(
    '[data-testid="filter-date-from"]',
    '2025-11-01'
  );
  await page.fill(
    '[data-testid="filter-date-to"]',
    '2025-12-31'
  );

  const mapPins = page.locator('[title="map-pin"]');
  const totalLabel = page.locator('[data-testid="appointments-total"]');

  const pinCount = await mapPins.count();

  const totalText = await totalLabel.innerText();
  const match = totalText.match(/\d+/);
  expect(match).not.toBeNull();
  expect(pinCount).not.toBeNull();
});

test('TC - Verificar consulta de citas cuando no hay registros en el rango', async ({ page }) => {
  await page.goto(TRACKING_URL);

  await page.fill(
    '[data-testid="filter-date-from"]',
    '2030-01-01'
  );
  await page.fill(
    '[data-testid="filter-date-to"]',
    '2030-01-31'
  );

  const mapPins = page.locator('[title="map-pin"]');
  const totalLabel = page.locator('[data-testid="appointments-total"]');
  const emptyMsg = page.locator('[data-testid="appointments-empty-state"]');

  const pinCount = await mapPins.count();

  expect(pinCount).not.toBeNull();

  await expect(mapPins).toHaveCount(0);

  await expect(totalLabel).toBeVisible();
  const totalText = await totalLabel.innerText();
  const match = totalText.match(/\d+/);
  expect(match).not.toBeNull();
  const totalFromLabel = Number(match![0]);
  expect(totalFromLabel).toBe(0);
});
