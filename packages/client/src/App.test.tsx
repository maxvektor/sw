import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

test("renders the aplication", () => {
  render(
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
  );

  const header = screen.getByText(/STAR WARS MOVIES/i);

  expect(header).toBeInTheDocument();
});
