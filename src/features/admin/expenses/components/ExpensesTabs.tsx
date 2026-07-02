"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { ExpensesTable } from "./ExpensesTable";
import type { Expense } from "../types";
import type { SelectOption } from "@/components/shared/filter";

interface ExpensesTabsProps {
  personalExpenses: Expense[];
  visaExpenses: Expense[];
  currentPage: number;
}

export function ExpensesTabs({
  personalExpenses,
  visaExpenses,
  currentPage,
}: ExpensesTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get("tab") || "personal";
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "personal") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    params.delete("page");
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  // Filter options
  const filterOptions: SelectOption[] = [
    { value: "pending", label: "Pending" },
    { value: "reviewed", label: "Reviewed" },
    { value: "paid", label: "Paid" },
  ];

  const personalStatus = searchParams.get("personal-status") || "all";
  const visaStatus = searchParams.get("visa-status") || "all";
  const personalSearch = searchParams.get("personal-search") || "";
  const visaSearch = searchParams.get("visa-search") || "";

  // Filter personal expenses
  const filteredPersonal = personalExpenses.filter((expense) => {
    if (personalStatus !== "all" && expense.status !== personalStatus)
      return false;
    if (personalSearch) {
      const search = personalSearch.toLowerCase();
      return expense.employeeName.toLowerCase().includes(search);
    }
    return true;
  });

  // Filter visa expenses
  const filteredVisa = visaExpenses.filter((expense) => {
    if (visaStatus !== "all" && expense.status !== visaStatus) return false;
    if (visaSearch) {
      const search = visaSearch.toLowerCase();
      return expense.employeeName.toLowerCase().includes(search);
    }
    return true;
  });

  // Calculate subtotals
  const personalSubtotal = filteredPersonal.reduce(
    (sum, e) => sum + e.total,
    0,
  );
  const visaSubtotal = filteredVisa.reduce((sum, e) => sum + e.total, 0);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-1 h-auto gap-1 w-full overflow-x-auto">
        <TabsTrigger
          value="personal"
          className="rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 data-[state=active]:bg-[#135CC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#667085] data-[state=inactive]:hover:text-[#0F172B]"
        >
          Personal Expenses
          {personalSubtotal > 0 && (
            <span className="ml-2 text-[11px] font-normal text-secondary-txt data-[state=active]:text-white/80">
              Subtotal: ${personalSubtotal.toFixed(2)}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger
          value="visa"
          className="rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 data-[state=active]:bg-[#135CC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#667085] data-[state=inactive]:hover:text-[#0F172B]"
        >
          Visa / Company Card
          {visaSubtotal > 0 && (
            <span className="ml-2 text-[11px] font-normal text-secondary-txt data-[state=active]:text-white/80">
              Subtotal: ${visaSubtotal.toFixed(2)}
            </span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="mt-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <GlobalSearch
            name="personal-search"
            placeholder="Search employee..."
            className="flex-1 max-w-sm"
            debounceMs={300}
          />
          <GlobalFilter
            name="personal-status"
            placeholder="All"
            options={filterOptions}
            className="w-45"
            defaultValue="all"
          />
        </div>
        <div className="text-sm text-secondary-txt">
          Showing {filteredPersonal.length} personal entries
        </div>
        <ExpensesTable
          data={filteredPersonal}
          totalItems={filteredPersonal.length}
          currentPage={currentPage}
          type="personal"
        />
      </TabsContent>

      <TabsContent value="visa" className="mt-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <GlobalSearch
            name="visa-search"
            placeholder="Search employee..."
            className="flex-1 max-w-sm"
            debounceMs={300}
          />
          <GlobalFilter
            name="visa-status"
            placeholder="All"
            options={filterOptions}
            className="w-45"
            defaultValue="all"
          />
        </div>
        <div className="text-sm text-secondary-txt">
          Showing {filteredVisa.length} visa entries
        </div>
        <ExpensesTable
          data={filteredVisa}
          totalItems={filteredVisa.length}
          currentPage={currentPage}
          type="visa"
        />
      </TabsContent>
    </Tabs>
  );
}
