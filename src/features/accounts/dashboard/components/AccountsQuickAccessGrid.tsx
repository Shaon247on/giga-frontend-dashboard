import { AccountsQuickAccessCard } from "./AccountsQuickAccessCard";
import type { AccountsQuickAccessCard as AccountsQuickAccessCardType } from "../types";

interface AccountsQuickAccessGridProps {
  cards: AccountsQuickAccessCardType[];
}

export function AccountsQuickAccessGrid({ cards }: AccountsQuickAccessGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <AccountsQuickAccessCard key={card.id} card={card} />
      ))}
    </div>
  );
}