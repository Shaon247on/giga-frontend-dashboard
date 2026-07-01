"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2, Eye } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Column, Action } from "@/components/shared/data-table";
import type { Employee } from "../types";
import { cn } from "@/lib/utils";
import { DeleteEmployeeDialog } from "./DeleteEmployeeDialog";

interface EmployeesTableProps {
  employees: Employee[];
  totalItems: number;
  currentPage: number;
}

export function EmployeesTable({
  employees,
  totalItems,
  currentPage,
}: EmployeesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  const handleRowClick = (employee: Employee) => {
    // Navigate to employee details
    router.push(`/admin/employees/${employee.id}`);
  };

  const handleView = (employee: Employee) => {
    router.push(`/admin/employees/${employee.id}`);
  };

  const handleEdit = (employee: Employee) => {
    router.push(`/admin/employees/${employee.id}?edit=true`);
  };

  const handleDelete = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (employee: Employee) => {
    console.log("Deleting employee:", employee.id);
    // Refresh the page or update the list
    router.refresh();
  };

  // Define columns
  const columns: Column<Employee>[] = [
    {
      key: "name",
      header: "Name",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: item.avatarColor }}
          >
            <span className="text-[11px] font-bold text-white">
              {item.initials}
            </span>
          </div>
          <span className="font-medium text-primary-txt">{item.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (item) => (
        <span className="text-secondary-txt">{item.email}</span>
      ),
    },
    {
      key: "role",
      header: "Role",
      cell: (item) => (
        <span className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold",
          item.role === "Admin" && "bg-purple-50 text-purple-600",
          item.role === "Supervisor" && "bg-blue-50 text-blue-600",
          item.role === "Employee" && "bg-slate-50 text-slate-600",
        )}>
          {item.role}
        </span>
      ),
    },
    {
      key: "vehicle",
      header: "Vehicle",
      cell: (item) => (
        <span className={cn(
          "text-primary-txt",
          item.vehicle === "—" && "text-secondary-txt"
        )}>
          {item.vehicle}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} />,
    },
  ];

  // Define actions
  const actions: Action<Employee>[] = [
    {
      label: "View",
      icon: <Eye className="w-3.5 h-3.5" />,
      onClick: (item) => handleView(item),
      variant: "outline",
      size: "sm",
    },
    {
      label: "Edit",
      icon: <Pencil className="w-3.5 h-3.5" />,
      onClick: (item) => handleEdit(item),
      variant: "outline",
      size: "sm",
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-3.5 h-3.5" />,
      onClick: (item) => handleDelete(item),
      variant: "reject-soft",
      size: "sm",
    },
  ];

  return (
    <>
      <DataTable
        data={employees}
        columns={columns}
        actions={actions}
        keyExtractor={(item) => item.id}
        onRowClick={handleRowClick}
        selectedId={selectedId}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        showPagination={true}
        showRecordCount={true}
        emptyMessage="No employees found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteEmployeeDialog
        employee={employeeToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}