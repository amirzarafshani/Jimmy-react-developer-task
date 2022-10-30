import { Link } from "react-router-dom";
import { ManufacturerTableRowInterface } from "../../../interfaces/manufacturer.interface";

function TableRow({ manufacturer }: ManufacturerTableRowInterface) {
  return (
    <tr
      key={manufacturer.Mfr_ID}
      className="bg-white border-b even:bg-gray-50 hover:bg-blue-50"
    >
      <td className="p-2.5">{manufacturer.Mfr_ID}</td>
      <td>{manufacturer.Mfr_CommonName}</td>
      <td>{manufacturer.Country}</td>
      <td className="p-2.5 text-right">
        <Link
          to={`/details/${manufacturer.Mfr_ID}`}
          className="px-3 py-1.5 rounded-md border border-blue-700 text-blue-800 font-semibold hover:bg-blue-500 hover:text-white transition-all cursor-pointer text-sm"
        >
          SHOW DETAILS
        </Link>
      </td>
    </tr>
  );
}

export default TableRow;
