import { useState, useEffect } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {
  ModelInterface,
  ModelsPropsInterface,
} from "../../../interfaces/model.interface";
import ModelTableRow from "./ModelTableRow";
import API from "../../../utils/api";

function ModelsTable({ makeId }: ModelsPropsInterface) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [models, setModels] = useState<ModelInterface[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      setIsLoading(true);
      API.get(`getModelsForMakeId/${makeId}?format=json`, {
        signal: controller.signal,
      })
        .then((res) => {
          setModels(res.data.Results);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    };
    if (makeId) {
      getData();
    }

    return () => {
      controller.abort();
    };
  }, [makeId]);

  return isLoading ? (
    <LoadingSpinner />
  ) : models ? (
    <table
      className="min-w-full divide-y divide-gray-200 border border-gray-200"
      data-testid="models-table"
    >
      <thead className="bg-blue-600 text-white">
        <tr className="uppercase">
          <th className="px-1 text-left w-1/3">MODEL ID</th>
          <th className="px-1 text-left">MODEL NAME</th>
        </tr>
      </thead>
      <tbody>
        {models?.map((model: ModelInterface) => (
          <ModelTableRow key={model.Model_ID} model={model} />
        ))}
      </tbody>
    </table>
  ) : (
    <div>error</div>
  );
}

export default ModelsTable;
