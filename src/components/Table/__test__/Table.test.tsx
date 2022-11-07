import { render, waitFor } from "@testing-library/react";
import Table from "../index";

const tableHeader: any = {
  id: "id",
  firstName: "first name",
  lastName: "last name",
  age: "age",
};

const tableItems = [
  {
    id: 1,
    firstName: "Jon",
    lastName: "Doe",
    age: 20,
  },
];

describe("test Table component", () => {
  test("test TableComponent to display properly", async () => {
    const renderComponent = () =>
      render(<Table headers={tableHeader} items={tableItems} />);
    const { getByRole } = renderComponent();

    await waitFor(() => {
      const table = getByRole("table");
      const row = table.getElementsByTagName("tr");
      const th = table.getElementsByTagName("th");
      const td = table.getElementsByTagName("td");
      expect(table).toBeInTheDocument();
      expect(row).toHaveLength(tableItems.length + 1);
      expect(th).toHaveLength(Object.keys(tableHeader).length);
      expect(td).toHaveLength(Object.keys(tableItems[0]).length);
    });
  });
});
