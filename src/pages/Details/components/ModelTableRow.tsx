import { ModelPropsInterface } from "../../../interfaces/model.interface";

function ModelTableRow({ model }: ModelPropsInterface) {
  return (
    <tr className="bg-white border-b even:bg-gray-50 hover:bg-blue-50">
      <td className="py-2.5 px-1">{model.Model_ID}</td>
      <td className="px-1">{model.Model_Name}</td>
    </tr>
  );
}

export default ModelTableRow;
