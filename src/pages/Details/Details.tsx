import { useParams } from "react-router-dom";
import MakesList from "./components/MakesList";
import ManufacturerDetails from "./components/ManufacturerDetails";

function Details(): JSX.Element {
  const { manufacturerId } = useParams();

  return (
    <div className="container mx-auto my-5">
      <ManufacturerDetails manufacturerId={manufacturerId} />
      <MakesList manufacturerId={manufacturerId} />
    </div>
  );
}

export default Details;
