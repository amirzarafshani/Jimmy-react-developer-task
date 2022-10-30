import React from "react";
import { render, waitFor } from "@testing-library/react";
import ManufacturerDetails from "../ManufacturerDetails";

describe("ManufacturerDetails", () => {
  let useEffect: any;

  beforeEach(() => {
    useEffect = jest
      .spyOn(React, "useEffect")
      .mockImplementationOnce(() => true);
  });

  test("'useEffect' calling times and rendering appropriate content", async () => {
    const renderComponent = () => render(<ManufacturerDetails />);
    const { getByTestId } = renderComponent();

    expect(useEffect).toHaveBeenCalledTimes(1);
    useEffect.mockImplementation(1);

    await waitFor(() => {
      const loading = getByTestId("loading-spinner");
      expect(loading).toBeInTheDocument();

      waitFor(() => {
        const manufacturersDetails = getByTestId("manufacturer-details");
        expect(manufacturersDetails).toBeInTheDocument();

        expect(loading).not.toBeInTheDocument();
      });
    });
  });
});
