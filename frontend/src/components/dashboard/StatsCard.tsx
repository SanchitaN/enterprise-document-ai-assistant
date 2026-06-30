import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 text-3xl">{icon}</div>

      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}