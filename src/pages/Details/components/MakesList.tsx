import ErrorDisplay from "../../../components/ErrorDisplay";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useFetch from "../../../hooks/useFetch";
import {
  GetMakesListResponse,
  MakeForManufacturer,
  MakesListPropsInterface,
} from "../../../interfaces/makeForManufacturer.interface";
import ModelsTable from "./ModelsTable";

const apiUrl = process.env.REACT_APP_API_URL;

export default function MakesList({
  manufacturerId,
}: MakesListPropsInterface): JSX.Element {
  const params = { format: "json" };
  const url = `${apiUrl}getMakeForManufacturer/${manufacturerId}?`;

  const { data, hasError, error, isLoading } = useFetch<GetMakesListResponse>(
    url,
    params
  );

  const manufacturerDetailsItems: MakeForManufacturer[] =
    data?.Results?.map((el) => ({
      Make_ID: el.Make_ID,
      Make_Name: el.Make_Name,
    })) || [];

  if (isLoading) return <LoadingSpinner />;

  if (hasError) return <ErrorDisplay error={error?.name} />;

  return (
    <ul className="manufacturer-details-list">
      {manufacturerDetailsItems?.map((make: MakeForManufacturer) => (
        <li key={make.Make_ID}>
          <div className="p-3 w-full bg-white rounded-lg border shadow-md sm:p-8 my-3">
            <h5 className="mb-2 font-semibold">{`Model for make ${make.Make_Name}`}</h5>
            <ModelsTable makeId={make.Make_ID} />
          </div>
        </li>
      ))}
    </ul>
  );
}
