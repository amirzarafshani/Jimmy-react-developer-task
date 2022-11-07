import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "fetch-mock";
import { act } from "react-test-renderer";
import ManufacturerDetails from "../ManufacturerDetails";

describe("ManufacturerDetails Page", () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });
  it("should return data with a successful request", async () => {
    const { container, getByRole, getByText } = render(
      <BrowserRouter>
        <ManufacturerDetails manufacturerId="955" />
      </BrowserRouter>
    );
    const loading = container.getElementsByClassName("spinner-container")[0];

    fetchMock.mock("test.com", {
      returnedData: "foo",
    });
    await act(async () => {
      expect(loading).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(() => getByText("loading")).then(() => {
      const table = getByRole("table");
      expect(table).toBeInTheDocument();
      const row = table.getElementsByTagName("tr");
      expect(row.length).toEqual(2);
    });
  });

  it("should return error when fails", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ManufacturerDetails manufacturerId="955" />
      </BrowserRouter>
    );

    fetchMock.mock("falsy-routes.com", {
      throws: { message: "network error" },
    });

    await waitFor(() => {
      const error = getByText("Error");
      expect(error).toBeInTheDocument();
    });
  });
});
