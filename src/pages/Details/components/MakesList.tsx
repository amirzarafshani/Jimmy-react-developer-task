import { useState, useEffect } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {
  MakeForManufacturer,
  MakesListPropsInterface,
} from "../../../interfaces/makeForManufacturer.interface";
import ModelsTable from "./ModelsTable";
import API from "../../../utils/api";

function MakesList({ manufacturerId }: MakesListPropsInterface) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [makesForManufacturer, setMakesForManufacturer] = useState<
    MakeForManufacturer[]
  >([]);

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      if (manufacturerId) {
        setIsLoading(true);
        await API.get(`getMakeForManufacturer/${manufacturerId}?format=json`, {
          signal: controller.signal,
        })
          .then((res: any) => {
            setMakesForManufacturer(res.data.Results);
            setIsLoading(false);
          })
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
      }
    };
    getData();

    return () => {
      controller.abort();
    };
  }, [manufacturerId]);

  return isLoading ? (
    <LoadingSpinner />
  ) : makesForManufacturer ? (
    <ul>
      {makesForManufacturer?.map((make: MakeForManufacturer) => (
        <li key={make.Make_ID}>
          <div className="p-3 w-full bg-white rounded-lg border shadow-md sm:p-8 my-3">
            <h5 className="mb-2 font-semibold">{`Model for make ${make.Make_Name}`}</h5>
            <ModelsTable makeId={make.Make_ID} />
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div>error</div>
  );
}

export default MakesList;
