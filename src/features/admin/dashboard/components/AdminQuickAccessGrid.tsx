import { AdminQuickAccessCard } from "./AdminQuickAccessCard";
import type { AdminQuickAccessCard as AdminQuickAccessCardType } from "../types";

interface AdminQuickAccessGridProps {
  cards: AdminQuickAccessCardType[];
}

export function AdminQuickAccessGrid({ cards }: AdminQuickAccessGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => (
        <AdminQuickAccessCard key={card.id} card={card} />
      ))}
    </div>
  );
}