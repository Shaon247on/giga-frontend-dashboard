import { notFound } from "next/navigation";
import { EmployeeDetailsView, fetchEmployeesPageData } from "@/features/admin/employees";

interface EmployeeDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function EmployeeDetailsContent({ params }: EmployeeDetailsPageProps) {
  const { id } = await params;
  const data = await fetchEmployeesPageData();
  const employee = data.employees.find((emp) => emp.id === id);

  if (!employee) {
    notFound();
  }

  return <EmployeeDetailsView employee={employee} />;
}

export default function EmployeeDetailsPage(props: EmployeeDetailsPageProps) {
  return <EmployeeDetailsContent {...props} />;
}

export const metadata = {
  title: "Employee Details",
};