import { DollarSign, Users, CreditCard, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpenseSummaryCardsProps {
  grandTotal: number;
  personalTotal: number;
  visaTotal: number;
  pendingTotal: number;
}

const ICON_MAP = {
  grand: {
    icon: DollarSign,
    color: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  personal: {
    icon: Users,
    color: "text-emerald-600",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
  },
  visa: {
    icon: CreditCard,
    color: "text-purple-600",
    border: "border-purple-200",
    bg: "bg-purple-50",
  },
  pending: {
    icon: Clock,
    color: "text-amber-600",
    border: "border-amber-200",
    bg: "bg-amber-50",
  },
};

export function ExpenseSummaryCards({
  grandTotal,
  personalTotal,
  visaTotal,
  pendingTotal,
}: ExpenseSummaryCardsProps) {
  const cards = [
    {
      id: "grand",
      value: `$${grandTotal.toFixed(2)}`,
      label: "Grand Total",
      icon: "grand",
    },
    {
      id: "personal",
      value: `$${personalTotal.toFixed(2)}`,
      label: "Personal Expenses",
      icon: "personal",
    },
    {
      id: "visa",
      value: `$${visaTotal.toFixed(2)}`,
      label: "Visa / Card",
      icon: "visa",
    },
    {
      id: "pending",
      value: `$${pendingTotal.toFixed(2)}`,
      label: "Pending Payment",
      icon: "pending",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => {
        const { icon: Icon, color, border, bg } = ICON_MAP[card.icon as keyof typeof ICON_MAP];
        return (
          <div
            key={card.id}
            className={cn(
              "flex flex-col items-start text-center p-5 rounded-2xl bg-white border-2 shadow-sm",
              "transition-shadow duration-200 hover:shadow-md",
              border
            )}
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3", bg)}>
              <Icon className={cn("w-6 h-6", color)} strokeWidth={1.8} />
            </div>
            <p className="text-3xl font-bold text-primary-txt leading-tight">
              {card.value}
            </p>
            <p className="text-[12px] text-secondary-txt mt-1 leading-tight">
              {card.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}