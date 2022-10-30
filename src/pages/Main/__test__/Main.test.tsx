import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Main from "../Main";

describe("Main Page", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

  test("renders 'loading-spinner' before fetching, remove 'loading-spinner' after getting data", async () => {
    const { getByTestId } = renderComponent();

    const loading = getByTestId("loading-spinner");
    expect(loading).toBeInTheDocument();

    await waitFor(() => {
      const manufacturersList = getByTestId("manufacturers-list");
      expect(manufacturersList).toBeInTheDocument();

      expect(loading).not.toBeInTheDocument();
    });
  });
});
