
import { DataTable } from "@/components/shared/data-table";
import type { Column } from "@/components/shared/data-table";
import type { FleetRecord } from "../types";

interface FleetListTabProps {
  data: FleetRecord[];
}

export function FleetListTab({ data }: FleetListTabProps) {
 
  const columns: Column<FleetRecord>[] = [
    {
      key: "vehicle",
      header: "Vehicle",
      cell: (item) => (
        <span className="font-medium text-primary-txt">{item.vehicle}</span>
      ),
    },
    {
      key: "yearMake",
      header: "Year / Make",
      cell: (item) => (
        <span className="text-primary-txt">{item.yearMake}</span>
      ),
    },
    {
      key: "plate",
      header: "Plate",
      cell: (item) => (
        <span className="font-mono text-primary-txt">{item.plate}</span>
      ),
    },
    {
      key: "mileage",
      header: "Mileage",
      cell: (item) => (
        <span className="text-primary-txt">{item.mileage.toLocaleString()} km</span>
      ),
    },
    {
      key: "assignedTo",
      header: "Assigned To",
      cell: (item) => (
        <span className="text-primary-txt">{item.assignedTo}</span>
      ),
    },
    {
      key: "oilChange",
      header: "Oil Change",
      cell: (item) => (
        <span className="text-primary-txt">{item.oilChange}</span>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      keyExtractor={(item) => item.id}
      showPagination={false}
      showRecordCount={true}
      emptyMessage="No fleet records found"
      className="border-0 shadow-none"
    />
  );
}