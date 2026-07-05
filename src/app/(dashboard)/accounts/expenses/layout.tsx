import { ReactNode } from "react";

interface ExpensesLayoutProps {
  children: ReactNode;
  preview: ReactNode;
}

export default function ExpensesLayout({ children, preview }: ExpensesLayoutProps) {
  return (
    <>
      {children}
      {preview}
    </>
  );
}