import { test } from "./page-objects/AuthPage";

test.describe("Authentication page", () => {
    test("Can authenticate with valid username and password", async ({ authPage }) => {
        await authPage.makeLogin(process.env.AUTH_USERNAME, process.env.AUTH_PASSWORD);

        await authPage.grantPermissions();

        await authPage.successAuth();
    });

    test("Cannot authenticate with invalid username or password", async ({ authPage }) => {
        await authPage.makeLogin('12345678', 'test123');

        await authPage.showInvalidCredentialsMessage();
    });
});