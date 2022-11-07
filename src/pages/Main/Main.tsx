import { useState } from "react";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  GetManufacturersResponse,
  ManufacturerInterface,
} from "../../interfaces/manufacturer.interface";
import { OnPageChangeInterface } from "../../interfaces/pagination.interface";
import useFetch from "../../hooks/useFetch";
import useNoInitialEffect from "../../hooks/useNoInitialEffect";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import ErrorDisplay from "../../components/ErrorDisplay";

const apiUrl = process.env.REACT_APP_API_URL;
const url = `${apiUrl}getallmanufacturers?`;

const Main = () => {
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<any>({ page: page, format: "json" });

  const { data, hasError, error, isLoading, refetch } =
    useFetch<GetManufacturersResponse>(url, params);

  useNoInitialEffect(() => {
    setParams({ page: page, format: "json" });
  }, [page]);

  useNoInitialEffect(() => {
    refetch(params);
  }, [params]);

  const handlePageClick = (event: OnPageChangeInterface) => {
    setPage(event.selected + 1);
  };

  const manufacturerHeaders: any = {
    Mfr_ID: "ID",
    comonName: "company name",
    country: "country",
    link: "",
  };

  const manufacturerItems: (ManufacturerInterface & { link: number })[] =
    data?.Results?.map((el) => ({
      Mfr_ID: el.Mfr_ID,
      Mfr_CommonName: el.Mfr_CommonName,
      Country: el.Country,
      link: el.Mfr_ID,
    })) || [];

  if (isLoading) return <LoadingSpinner />;

  if (hasError) return <ErrorDisplay error={error?.name} />;

  return (
    <div className="container mx-auto my-5">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={10}
        previousLabel="<"
        containerClassName="pagination"
        forcePage={page - 1}
      />

      <Table
        headers={manufacturerHeaders}
        items={manufacturerItems}
        className="table"
        customRenderers={{
          link: (it) => (
            <Link
              to={`/details/${it.link}`}
              className="px-3 py-1.5 rounded-md border border-blue-700 text-blue-800 font-semibold hover:bg-blue-500 hover:text-white transition-all cursor-pointer text-sm"
            >
              SHOW DETAILS
            </Link>
          ),
        }}
      />
    </div>
  );
};
export default Main;
