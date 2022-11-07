import { render, waitFor } from "@testing-library/react";
import ErrorDisplay from "../index";

describe("test ErrorDisplay component", () => {
  test("test ErrorDisplay to display properly", async () => {
    const renderComponent = () => render(<ErrorDisplay error="Error" />);
    const { getByText } = renderComponent();

    await waitFor(() => {
      const errorContainer = getByText("Error");
      expect(errorContainer).toBeInTheDocument();
    });
  });
});
