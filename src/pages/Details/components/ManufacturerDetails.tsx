import ErrorDisplay from "../../../components/ErrorDisplay";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Table from "../../../components/Table";
import useFetch from "../../../hooks/useFetch";
import {
  GetManufacturersResponse,
  ManufacturerDetailsPropsInterface,
  ManufacturerInterface,
} from "../../../interfaces/manufacturer.interface";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ManufacturerDetails({
  manufacturerId,
}: ManufacturerDetailsPropsInterface): JSX.Element {
  const params = { format: "json" };
  const url = `${apiUrl}getmanufacturerdetails/${manufacturerId}?`;

  const { data, hasError, error, isLoading } =
    useFetch<GetManufacturersResponse>(url, params);

  const manufacturerDetailsHeaders: any = {
    Mfr_ID: "ID",
    comonName: "company name",
    country: "country",
  };

  const manufacturerDetailsItems: ManufacturerInterface[] =
    data?.Results?.map((el) => ({
      Mfr_ID: el.Mfr_ID,
      Mfr_CommonName: el.Mfr_CommonName,
      Country: el.Country,
    })) || [];

  if (isLoading) return <LoadingSpinner />;

  if (hasError) return <ErrorDisplay error={error?.name} />;

  return (
    <Table
      headers={manufacturerDetailsHeaders}
      items={manufacturerDetailsItems}
      className="table"
    />
  );
}
