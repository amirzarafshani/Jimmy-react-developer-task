import "whatwg-fetch";
import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "../useFetch";
import { GetMakesListResponse } from "../../interfaces/makeForManufacturer.interface";

const apiUrl = process.env.REACT_APP_API_URL;
const url = `${apiUrl}getmanufacturerdetails/955?`;

describe("useFetch", () => {
  it("should return data after fetch", async () => {
    const { result } = renderHook(() =>
      useFetch<GetMakesListResponse>(url, { format: "json" })
    );

    await waitFor(() => {
      expect(result.current.data?.Results.length).toBe(1);
      expect(typeof result.current.data?.Results[0]).toBe("object");
    });
  });

  it("should throw error", async () => {
    const { result } = renderHook(() =>
      useFetch<GetMakesListResponse>(url + "xyz", { format: "json" })
    );

    await waitFor(() => {
      expect(result.current.data).toBe(undefined);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(true);
    });
  });
});
