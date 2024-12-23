import {test} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { createPDF } from '../utils/pdfCreator/generatePDF';

test("Login com sucesso", async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.abrir();
  await loginPage.setEmail();
  await loginPage.setSenha()
  await loginPage.clickBtnLogin()
  await loginPage.validandoAcesso();
});

test.afterEach(async ({page}) => {
  await createPDF();
  await page.close();
})