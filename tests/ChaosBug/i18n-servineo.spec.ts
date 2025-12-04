import { test, expect } from '@playwright/test';

// const BASE_URL = 'https://servineo.app'; // URL Produccion
const BASE_URL = 'https://servineo-frontend-bytes-bandidos.vercel.app';

// test.setTimeout(60000); // Fix para el error de timeout; aplica a todos los tests de este archivo

test.describe('Detección de idioma español con /es', () => {
  test.use({ locale: 'es-ES' });

  test('TC - Detección directa de español con /es', async ({ page }) => {
    await page.goto(`${BASE_URL}/es`);

    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/(servicios|bienvenido|iniciar sesión|registro|contacto|idioma)/i);

    const langAttr = await page.locator('html').getAttribute('lang');
    expect(langAttr?.toLowerCase()).toContain('es');
  });
});

test.describe('Detección automática de español sin /es', () => {
  test.use({ locale: 'es-ES' });

  test('TC - Auto detección de español', async ({ page }) => {
    await page.goto(BASE_URL);

    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/(servicios|bienvenido|iniciar sesión|registro|contacto|idioma)/i);

    const langAttr = await page.locator('html').getAttribute('lang');
    expect(langAttr?.toLowerCase()).toContain('es');
  });
});

test.describe('Detección de idioma inglés', () => {
  test.use({ locale: 'en-US' });

  test('TC - Detección de idioma inglés con /en', async ({ page }) => {
    await page.goto(`${BASE_URL}/en`);

    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/(services|home|login|sign in|register|contact|language)/i);

    const langAttr = await page.locator('html').getAttribute('lang');
    expect(langAttr?.toLowerCase()).toContain('en');
  });
});
