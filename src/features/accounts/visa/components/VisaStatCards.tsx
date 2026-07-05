import { cn } from "@/lib/utils";

interface VisaStatCardsProps {
  totalAmount: number;
  totalTax: number;
  totalSubmissions: number;
}

export function VisaStatCards({
  totalAmount,
  totalTax,
  totalSubmissions,
}: VisaStatCardsProps) {
  const cards = [
    {
      id: "total-amount",
      value: `$${totalAmount.toFixed(2)}`,
      label: "Total Amount",
      subtitle: "All visa expenses",
      valueColor: "text-primary-txt",
      subtitleColor: "text-secondary-txt",
    },
    {
      id: "total-tax",
      value: `$${totalTax.toFixed(2)}`,
      label: "Total Tax",
      subtitle: "All visa expenses",
      valueColor: "text-btn-reject",
      subtitleColor: "text-secondary-txt",
    },
    {
      id: "total-submissions",
      value: totalSubmissions.toString(),
      label: "Total Submissions",
      subtitle: "All visa expenses",
      valueColor: "text-blue-600",
      subtitleColor: "text-secondary-txt",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5"
        >
          <div className="flex flex-col items-center text-center">
            <p className={cn("text-3xl font-bold", card.valueColor)}>
              {card.value}
            </p>
            <p className="text-[15px] font-semibold text-primary-txt mt-1">
              {card.label}
            </p>
            {/* <p className={cn("text-[12px] mt-0.5", card.subtitleColor)}>
              {card.subtitle}
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
}