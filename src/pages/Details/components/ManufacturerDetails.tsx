import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {
  ManufacturerDetailsPropsInterface,
  ManufacturerInterface,
} from "../../../interfaces/manufacturer.interface";
import API from "../../../utils/api";

export default function ManufacturerDetails({
  manufacturerId,
}: ManufacturerDetailsPropsInterface): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [manufacturerDetails, setManufacturerDetails] =
    useState<ManufacturerInterface | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const getData = () => {
      API.get(`getmanufacturerdetails/${manufacturerId}?format=json`)
        .then((res) => {
          setManufacturerDetails(res.data.Results[0]);
          // setIsLoading(false);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    };
    if (manufacturerId) {
      getData();
    }

    return () => {
      controller.abort();
    };
  }, [manufacturerId]);

  return isLoading ? (
    <LoadingSpinner />
  ) : manufacturerDetails ? (
    <table
      className="min-w-full divide-y divide-gray-200 border border-gray-200"
      data-testid="manufacturer-details"
    >
      <thead className="bg-blue-600 text-white">
        <tr className="uppercase">
          <th className="p-2.5 text-left">ID</th>
          <th className="px-1 text-left">common name</th>
          <th className="px-1 text-left">country</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b">
          <td className="p-2.5">{manufacturerDetails?.Mfr_ID}</td>
          <td className="px-1">{manufacturerDetails?.Mfr_CommonName}</td>
          <td className="px-1">{manufacturerDetails?.Country}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div>error</div>
  );
}
