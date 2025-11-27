// components/StatusBadge.tsx
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

type Status = "pending" | "canceled" | "accepted";

interface StatusBadgeProps {
  status: Status;
}

const statusStyles: Record<Status, string> = {
  pending:
    "bg-yellow-500 text-white ",
  accepted:
    "bg-green-800 text-white ",
  canceled:
    "bg-red-500 text-white ",
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge
      className={clsx(
        "capitalize px-3 py-1 text-sm font-medium",
        statusStyles[status]
      )}
      variant="secondary"
    >
      {status}
    </Badge>
  );
};
