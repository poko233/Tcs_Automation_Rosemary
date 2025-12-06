import { test, expect } from '@playwright/test';

// TC1: Verificar campo cargo solo permita caracteres válidos
test('AQARius - Verificar que el campo cargo solo permita caracteres válidos', async ({ page }) => {
  // Paso 1: Ir a la página donde está el formulario de experiencia / cargo
  await page.goto('https://front-fixer-stories.onrender.com/fixers');

  
  const campoCargo = page.locator('input[name="cargo"]');

 
  await expect(campoCargo).toBeVisible();

  
  await campoCargo.fill('Desarrollador Frontend');
  await expect(campoCargo).toHaveValue('Desarrollador Frontend');

 
  await campoCargo.fill('@@@@@@@');

  
});

// TC2: Verificar que el icono "agregar experiencia" redirija al formulario
test('AQARius - Verificar que el icono agregar experiencia redirija al formulario', async ({ page }) => {
  
  await page.goto('https://front-fixer-stories.onrender.com/fixers');

  
  const botonAgregarExperiencia = page.locator('button:has-text("Agregar experiencia")');
  await expect(botonAgregarExperiencia).toBeVisible();
  await botonAgregarExperiencia.click();

  
  const tituloFormulario = page.getByText('Agregar experiencia');
  await expect(tituloFormulario).toBeVisible();


});
