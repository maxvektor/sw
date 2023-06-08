import { test, expect } from '@playwright/test';

test.describe('main page', () => {
  test('should show a list of movies', async ({ page }) => {
    await page.goto('/');
    const moiesList = page.getByTestId('movies-list');
    await expect(moiesList).toBeVisible();
  });

  test('should show movies first and last movie', async ({ page }) => {
    await page.goto('/');
    const firsrtMovie = page.getByTestId('movies-item-4');
    const lastMovie = page.getByTestId('movies-item-4');
    await expect(firsrtMovie).toBeVisible();
    await expect(lastMovie).toBeVisible();
  });

  test('first movie title should be "A new Hope" ', async ({ page }) => {
    await page.goto('/');
    const firsrtMovieTitle = page.getByTestId('movies-item-4').getByTestId('movie-title');
    await expect(firsrtMovieTitle).toHaveText('A New Hope');
  });
});


test.describe('the movie page', () => {
  test('should be shown when click on movie title', async ({ page }) => {
    await page.goto('/');
    const firsrtMovieTitle = page.getByTestId('movies-item-5').getByTestId('movie-title');
    await firsrtMovieTitle.click();
    const url = await page.url();
    await expect(url).toContain('/movies/5');
  });

  test('should be shown by link', async ({ page }) => {
    await page.goto('/movies/2');
    const title = page.getByTestId('movie-title');
    const url = await page.url();
    await expect(url).toContain('/movies/2');
    await expect(title).toContainText('Attack of the Clones');
  });

  test('click on "star wars" should lead to the main page', async ({ page }) => {
    await page.goto('/movies/2');
    const pageTitle = page.getByTestId('site-logo');
    await pageTitle.click();
    const url = await page.url();
    await expect(url).toContain('/');
  });
});

