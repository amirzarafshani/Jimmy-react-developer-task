import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "fetch-mock";
import { act } from "react-test-renderer";
import MakesList from "../MakesList";

describe("MakesList Page", () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });
  it("should return data with a successful request", async () => {
    const { container, getByText } = render(
      <BrowserRouter>
        <MakesList manufacturerId="955" />
      </BrowserRouter>
    );
    const loading = getByText("loading");

    fetchMock.mock("test.com", {
      returnedData: "foo",
    });

    await act(async () => {
      expect(loading).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(() => getByText("loading")).then(() => {
      const ul = container.getElementsByClassName("manufacturer-details-list");
      expect(ul.length).toBeGreaterThan(0);
      expect(loading).not.toBeInTheDocument();
    });
  });

  it("should return error when fails", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <MakesList manufacturerId="955" />
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
