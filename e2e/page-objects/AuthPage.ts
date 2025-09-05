import { expect, Locator, Page } from "@playwright/test";
import { test as base } from "@playwright/test"; 

export const test = base.extend<{ authPage: AuthPage }>({
    authPage: async ({ page }, use) => {
        const authPage = new AuthPage(page);
        await authPage.visit();
        await use(authPage);
    }
});

export default class AuthPage {
    private readonly page: Page;
    private readonly continueButton: Locator;
    private readonly inputUsername: Locator;
    private readonly inputPasssword: Locator;
    private readonly logo: Locator;
    private readonly invalidCredentialsMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.getByRole('button', { name: 'Continuar' });
        this.inputUsername = page.getByRole('textbox', { name: 'Usuário do Portal' });
        this.inputPasssword = page.getByRole('textbox', { name: 'Senha:' });
        this.logo = page.getByRole('link', { name: 'Brasão do Estado de Goiás' });
        this.invalidCredentialsMessage = page.getByText('Login falhou! Favor verifique o usuário e senha e tente novamente.');
    }

    async visit() {
        await this.page.goto('/');
    }

    async makeLogin(username: string, password: string) {
        await this.inputUsername.fill(username);
        await this.inputPasssword.fill(password);
        await this.continueButton.click();
    }

    async grantPermissions() {
        const usernameLabel = this.page.getByRole('heading', { name: 'A aplicação precisa conhecer alguns dos seus detalhes'});
        await expect(usernameLabel).toBeVisible();

        await this.continueButton.click();
    }

    async successAuth() {
        await expect(this.page).toHaveURL('#/');

        await expect(this.logo).toBeVisible();
    }

    async showInvalidCredentialsMessage() {
        await expect(this.invalidCredentialsMessage).toBeVisible();
    }
}