import React from "react";
import { render, waitFor } from "@testing-library/react";
import MakesList from "../MakesList";

describe("MakesList", () => {
  let useEffect: any;

  beforeEach(() => {
    useEffect = jest
      .spyOn(React, "useEffect")
      .mockImplementationOnce(() => true);
  });

  test("'useEffect' calling times and rendering appropriate content", async () => {
    const renderComponent = () => render(<MakesList manufacturerId={"1"} />);
    const { getByTestId } = renderComponent();

    expect(useEffect).toHaveBeenCalledTimes(1);
    useEffect.mockImplementation(1);

    await waitFor(() => {
      const loading = getByTestId("loading-spinner");
      expect(loading).toBeInTheDocument();
    });
  });
});
