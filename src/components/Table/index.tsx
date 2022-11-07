import React from "react";

/** Helpers */

// helper to get an array containing the object values with
// the correct type infered.
function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

type PrimitiveType = string | Symbol | number | boolean;

// Type guard for the primitive types which will support printing
// out of the box
function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "symbol"
  );
}

/** Component */

interface MinTableItem {}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

interface TableProps<T extends MinTableItem> {
  items: T[];
  headers: TableHeaders<T>;
  customRenderers?: CustomRenderers<T>;
  className?: string;
}

export default function Table<T extends MinTableItem>(props: TableProps<T>) {
  function renderRow(item: T, i:number): any {
    return (
      <tr key={i}>
        {objectKeys(item).map((itemProperty, i) => {
          const customRenderer = props.customRenderers?.[itemProperty];

          if (customRenderer) {
            return <td key={i}>{customRenderer(item)}</td>;
          }

          return (
            // @ts-ignore
            <td key={i}>{isPrimitive(item[itemProperty]) ? item[itemProperty] : ""}</td>
          );
        })}
      </tr>
    );
  }

  return (
    <table className={props.className}>
      <thead>
        <tr>
          {objectValues(props.headers).map((headerValue, i) => (
            <th key={i}>{headerValue}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.items.map(renderRow)}</tbody>
    </table>
  );
}
