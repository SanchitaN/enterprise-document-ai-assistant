
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {subtitle}
          </p>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}
        >
          <span className="text-2xl">
            {icon}
          </span>
        </div>

      </div>

    </div>
  );
}


