import { test, expect } from '@playwright/test';

const HOST = 'https://servineo.app';

const TRACKING_URL = `${HOST}/es/tracking-appointments`;

test('TC - Verificar consulta de citas en un rango de tiempo definido en tracking-appointments', async ({ page }) => {
  await page.goto(TRACKING_URL, { waitUntil: 'networkidle' });

  const fromDateInput = page.locator('input[type="date"]').first();
  await fromDateInput.fill('2025-11-01');
  const toDateInput = page.locator('input[type="date"]').first();
  await toDateInput.fill('2025-12-31');

  const totalLabel = page.locator(
    'body > div.w-full.min-h-screen.bg-gray-50.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-4.gap-6.lg\\:h-\\[550px\\] > div.lg\\:col-span-1.h-full.flex.flex-col.gap-6 > div > div > div.bg-white.shadow-sm.rounded.p-4.border-l-4.border-blue-500 > p'
  );
  const markerPane = page.locator(
    'body > div.w-full.min-h-screen.bg-gray-50.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-4.gap-6.lg\\:h-\\[550px\\] > div.lg\\:col-span-3.bg-white.rounded-xl.shadow.border.border-gray-200.overflow-hidden.relative.z-0.h-\\[400px\\].lg\\:h-full > div > div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane'
  );
  const pinCount = await markerPane.locator('img').count();

  const totalText = await totalLabel.innerText();
  const match = totalText.match(/\d+/);
  expect(match).not.toBeNull();
  expect(pinCount).not.toBeNull();
});

test('TC - Verificar consulta de citas cuando no hay registros en el rango', async ({ page }) => {
  await page.goto(TRACKING_URL);

  const fromDateInput = page.locator('input[type="date"]').first();
  await fromDateInput.fill('2030-01-01');
  const toDateInput = page.locator('input[type="date"]').first();
  await toDateInput.fill('2030-01-31');

  const totalLabel = page.locator(
    'body > div.w-full.min-h-screen.bg-gray-50.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-4.gap-6.lg\\:h-\\[550px\\] > div.lg\\:col-span-1.h-full.flex.flex-col.gap-6 > div > div > div.bg-white.shadow-sm.rounded.p-4.border-l-4.border-blue-500 > p'
  );
  const markerPane = page.locator(
    'body > div.w-full.min-h-screen.bg-gray-50.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-4.gap-6.lg\\:h-\\[550px\\] > div.lg\\:col-span-3.bg-white.rounded-xl.shadow.border.border-gray-200.overflow-hidden.relative.z-0.h-\\[400px\\].lg\\:h-full > div > div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane'
  );
  const pinCount = await markerPane.locator('img').count();

  expect(pinCount).not.toBeNull();

  await expect(pinCount).toBe(0);

  await expect(totalLabel).toBeVisible();
  const totalText = await totalLabel.innerText();
  const match = totalText.match(/\d+/);
  expect(match).not.toBeNull();
  const totalFromLabel = Number(match![0]);
  expect(totalFromLabel).toBe(0);
});
