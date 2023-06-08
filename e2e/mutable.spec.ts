import { test, expect } from "@playwright/test";
import fetch from "node-fetch";

const getServerBaseUrl = () => {
  const PR_ID = process.env.REACT_APP_VERCEL_GIT_PULL_REQUEST_ID;

  if (PR_ID) {
    return `https://maxvektor-starwars-server-pr-${PR_ID}.onrender.com`;
  }

  if (
    process.env.REACT_APP_VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  ) {
    return `https://maxvektor-starwars-server.onrender.com`;
  }

  if (process.env.NODE_ENV === "development" || process.env.VSCODE_PID) {
    // to run tests in VSCode
    return "http://localhost:3001";
  }

  return `https://maxvektor-starwars-server.onrender.com`;
};

if (process.env.NODE_ENV !== "production") {
  test.describe("the movie page", () => {
    test.afterAll(async () => {
      const url = `${getServerBaseUrl()}/__restore`;
      console.log("restoring backup", url);
      await fetch(url, { method: "POST" });
    });

    test.describe("edit", () => {
      test("should save edited movie", async ({ page }) => {
        // TODO: intoduce drivers for server and client;
        await page.goto("/movies/2");
        const editButton = page.getByTestId("edit-button");
        const title = page.getByTestId("movie-title-name");
        await expect(title).toContainText("Attack of the Clones");
        await editButton.click();
        let url = page.url();
        expect(url).toContain("/movies/2/edit");
        const titleInput = page.getByTestId("movie-title-input");
        await titleInput.fill("Attack of the Clones 2");
        const saveButton = page.getByTestId("save-button");
        await saveButton.click();
        const movieBreadcrumb = page.getByTestId("breadcrumb-2");
        await movieBreadcrumb.click();
        url = page.url();
        expect(url).toContain("/movies/2");
        await expect(title).toContainText("Attack of the Clones 2");
      });
    });
  });
}
