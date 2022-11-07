import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "fetch-mock";
import { act } from "react-test-renderer";
import Main from "../Main";

describe("Main Page", () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });
  it("should return data with a successful request", async () => {
    const { container, getByRole, getByText } = render(
      <BrowserRouter>
        <Main />
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
      const row = table.getElementsByTagName("tr")[1];
      const link = row.getElementsByTagName("a")[0];
      expect(link.href).toMatch(/\/details\/\d+/);
    });
  });

  it("should return error when fails", async () => {
    const { container, getByRole, getByText } = render(
      <BrowserRouter>
        <Main />
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
