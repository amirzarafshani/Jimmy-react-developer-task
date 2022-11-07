import ErrorDisplay from "../../../components/ErrorDisplay";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Table from "../../../components/Table";
import useFetch from "../../../hooks/useFetch";
import {
  GetModelsResponse,
  ModelInterface,
  ModelsPropsInterface,
} from "../../../interfaces/model.interface";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ModelsTable({
  makeId,
}: ModelsPropsInterface): JSX.Element {
  const params = { format: "json" };
  const url = `${apiUrl}getModelsForMakeId/${makeId}?`;

  const { data, hasError, error, isLoading } = useFetch<GetModelsResponse>(
    url,
    params
  );

  const modelHeaders: any = {
    Model_ID: "MODEL ID",
    Model_Name: "MODEL NAME",
  };

  const modelItems: ModelInterface[] =
    data?.Results?.map((el) => ({
      Model_ID: el.Model_ID,
      Model_Name: el.Model_Name,
    })) || [];

  if (isLoading) return <LoadingSpinner />;

  if (hasError) return <ErrorDisplay error={error?.name} />;

  return <Table headers={modelHeaders} items={modelItems} className="table" />;
}
