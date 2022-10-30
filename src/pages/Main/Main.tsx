import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ManufacturerInterface } from "../../interfaces/manufacturer.interface";
import { OnPageChangeInterface } from "../../interfaces/pagination.interface";
import API from "../../utils/api";
import TableRow from "./components/TableRow";

const ITEMS_PER_PAGE: number = 100;

const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [data, setData] = useState<ManufacturerInterface[] | undefined>(
    undefined
  );

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      await API.get(`getallmanufacturers?format=json&page=${page}`, {
        signal: controller.signal,
      })
        .then((res) => {
          setData(res.data?.Results);
          setPageCount(Math.ceil(res.data.Results.length / ITEMS_PER_PAGE));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    getData();

    return () => {
      controller.abort();
    };
  }, [page]);

  const handlePageClick = (event: OnPageChangeInterface) => {
    setPage(event.selected);
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="container mx-auto my-5">
      <table
        className="min-w-full divide-y divide-gray-200 border border-gray-200"
        data-testid="manufacturers-list"
      >
        <thead className="bg-blue-600 text-white uppercase">
          <tr className="">
            <th className="p-2.5 text-left">ID</th>
            <th className="px-1 text-left">common name</th>
            <th className="px-1 text-left">country</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: ManufacturerInterface) => (
            <TableRow key={item.Mfr_ID} manufacturer={item} />
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        containerClassName="flex items-center justify-center gap-1 w-full text-center py-5"
        pageClassName=""
        pageLinkClassName="border border-gray-400 rounded-md px-2 py-1 hover:bg-blue-700 hover:text-white hover:border-blue-700"
        nextLinkClassName="border border-gray-400 rounded-md px-2 py-1 hover:bg-blue-700 hover:text-white hover:border-blue-700"
        previousLinkClassName="border border-gray-400 rounded-md px-2 py-1 hover:bg-blue-700 hover:text-white hover:border-blue-700"
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
};
export default Main;
