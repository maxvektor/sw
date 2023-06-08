import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { BreadCrumbs } from "./BreadCrumbs";

const routes = [
  {
    path: "/",
    element: <BreadCrumbs />,
  },
  {
    path: "/movies/",
    element: <BreadCrumbs />,
  },
  {
    path: "/movies/:id",
    element: <BreadCrumbs />,
  },
  {
    path: "/movies/:id/character",
    element: <BreadCrumbs />,
  },
];

describe("BreadCrumbs", () => {
  test("should render movies > id on the rout /movies/:id/character", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/movies/12/character"],
    });

    render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );

    const movies = screen.getByTestId("breadcrumb-movies");
    const episodeId = screen.getByTestId("breadcrumb-12");
    const character = screen.queryByTestId("breadcrumb-character");

    expect(movies).toBeInTheDocument();
    expect(episodeId).toBeInTheDocument();
    expect(character).not.toBeInTheDocument();
  });

  test("should render movies > id on the rout /movies/", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/movies/12/"],
    });

    render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );

    const movies = screen.getByTestId("breadcrumb-movies");
    const episodeId = screen.queryByTestId("breadcrumb-12");
    const character = screen.queryByTestId("breadcrumb-character");

    expect(movies).toBeInTheDocument();
    expect(episodeId).not.toBeInTheDocument();
    expect(character).not.toBeInTheDocument();
  });

  test("should not be presented on root", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );

    const breadcrumbs = screen.queryByTestId("breadcrumbs");

    expect(breadcrumbs).not.toBeInTheDocument();
  });
});
