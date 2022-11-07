import { render, waitFor } from "@testing-library/react";
import LoadingSpinner from "../index";

describe("test LoadingSpinner component", () => {
  test("test LoadingSpinner to display properly", async () => {
    const renderComponent = () => render(<LoadingSpinner />);
    const { getByText } = renderComponent();

    await waitFor(() => {
      const loadingContainer = getByText("loading");
      expect(loadingContainer).toBeInTheDocument();
    });
  });
});
