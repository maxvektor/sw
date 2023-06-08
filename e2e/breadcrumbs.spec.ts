import { test, expect } from "@playwright/test";

test.describe("Breadcrumbs", () => {
  test("should be not presented on the main page", async ({ page }) => {
    await page.goto("/");
    const breadcrumbs = page.getByTestId("breadcrumbs");
    await expect(breadcrumbs).not.toBeVisible();
  });

  test("should be presented on the movie page", async ({ page }) => {
    await page.goto("/movies/2");
    const breadcrumbs = page.getByTestId("breadcrumbs");
    const movie = page.getByTestId("breadcrumb-movies");
    await expect(breadcrumbs).toBeVisible();
    await expect(movie).toHaveText("movies");
    await expect(breadcrumbs).toHaveText("movies");
  });
});
