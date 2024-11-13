import { takescreenshot } from '../utils/pdfCreator/generatePDF';
import { step } from '../utils/pdfCreator/datatest';
import { expect } from '@playwright/test';

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async abrir() {
        step("Abrindo navegador")
        await this.page.goto('https://admin-demo.nopcommerce.com/login')
        await takescreenshot(this.page)
    }

    async setEmail() {
        step("Setando email")
        await this.page.locator('input[name="Email"]').fill('admin@yourstore.com');
        await takescreenshot(this.page)
    }

    async setSenha() {
        step("Setando senha")
        await takescreenshot(this.page)
        await this.page.locator('input[name="Password"]').fill('admin');
    }

    async clickBtnLogin() {
        step("Clicando no botão")
        await takescreenshot(this.page)
        await this.page.locator("//button[text()='Log in']").click();
    }

    async validandoAcesso() {
        step("Valido acesso a página")
        await takescreenshot(this.page)
        await expect(this.page.getByRole('link', { name: 'Logout' })).toBeVisible();
    }
}



