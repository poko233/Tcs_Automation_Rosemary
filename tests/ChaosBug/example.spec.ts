import { test, expect } from '@playwright/test';

const DATE_FROM = '2025-01-01T00:00:00';
const DATE_TO   = '2025-01-31T23:59:00';

const EMPTY_RANGE_FROM = '2030-01-01T00:00:00';
const EMPTY_RANGE_TO   = '2030-01-31T23:59:00';

// TC-1 para el HU15
test.skip('Verificar consulta de citas en un rango de tiempo definido', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="login-email"]', 'admin@example.com');
  await page.fill('[data-testid="login-password"]', 'Admin123!');
  await page.click('[data-testid="login-submit"]');
  await expect(page).toHaveURL(/.*dashboard/i);

  await page.goto('/admin/appointments/metrics');

  await page.fill('[data-testid="filter-date-from"]', '2025-01-01 00:00');
  await page.fill('[data-testid="filter-date-to"]',   '2025-01-31 23:59');
  await page.click('[data-testid="filter-apply"]');

  const rows = page.locator('[data-testid="appointment-row"]');
  const mapPins = page.locator('[data-testid="map-pin"]');
  const totalCountLabel = page.locator('[data-testid="appointments-total"]');

  const rowCount = await rows.count();
  const pinCount = await mapPins.count();

  const fromTs = new Date(DATE_FROM).getTime();
  const toTs = new Date(DATE_TO).getTime();

  for (let i = 0; i < rowCount; i++) {
    const datetimeAttr = await rows.nth(i).getAttribute('data-appointment-datetime');
    const ts = new Date(datetimeAttr as string).getTime();
    expect(ts).toBeGreaterThanOrEqual(fromTs);
    expect(ts).toBeLessThanOrEqual(toTs);
  }

  const totalText = await totalCountLabel.innerText();
  const match = totalText.match(/\d+/);
  const totalFromLabel = Number(match![0]);
  expect(totalFromLabel).toBe(rowCount);

  expect(pinCount).toBe(rowCount);
});

// TC-2 para el HU15
test.skip('Verificar consulta de citas cuando no hay registros en el rango', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="login-email"]', 'admin@example.com');
  await page.fill('[data-testid="login-password"]', 'Admin123!');
  await page.click('[data-testid="login-submit"]');
  await expect(page).toHaveURL(/.*dashboard/i);

  await page.goto('/admin/appointments/metrics');

  await page.fill('[data-testid="filter-date-from"]', '2030-01-01 00:00');
  await page.fill('[data-testid="filter-date-to"]',   '2030-01-31 23:59');
  await page.click('[data-testid="filter-apply"]');

  const rows = page.locator('[data-testid="appointment-row"]');
  const mapPins = page.locator('[data-testid="map-pin"]');
  const emptyMsg = page.locator('[data-testid="appointments-empty-state"]');
  const totalLabel = page.locator('[data-testid="appointments-total"]');
  const metricsContainer = page.locator('[data-testid="metrics-view-container"]');
  const uiErrorBanner = page.locator('[data-testid="ui-error-banner"]');

  await expect(rows).toHaveCount(0);
  await expect(mapPins).toHaveCount(0);
  await expect(emptyMsg).toBeVisible();

  if (await totalLabel.isVisible()) {
    const text = await totalLabel.innerText();
    const match = text.match(/\d+/);
    if (match) {
      const totalFromLabel = Number(match[0]);
      expect(totalFromLabel).toBe(0);
    }
  }

  await expect(metricsContainer).toBeVisible();

  if (await uiErrorBanner.count()) {
    await expect(uiErrorBanner).not.toBeVisible();
  }

  await expect(page).toHaveURL(/.*appointments\/metrics/i);
});

// TC-1 para el HU9
test.skip('Detección automática del idioma español', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: 'es-ES',
  });

  const page = await context.newPage();

  // Ajusta a la URL real
  await page.goto('https://localhost:3000/');

  // Validar que el contenido principal esté en español
  const bodyText = await page.locator('body').innerText();

  expect(bodyText).toMatch(/(bienvenido|inicio|servicios|iniciar sesión|registrarse)/i);

  // verificar atributos lang de <html>
  const htmlLang = await page.locator('html').getAttribute('lang');
  expect(htmlLang?.toLowerCase()).toContain('es');

  await browser.close();
});
