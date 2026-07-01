export default function DocumentCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="h-12 w-12 rounded-xl bg-gray-200"></div>

        <div className="flex-1">

          <div className="h-5 w-40 rounded bg-gray-200"></div>

          <div className="mt-2 h-4 w-24 rounded bg-gray-100"></div>

        </div>

      </div>

      <div className="my-6 border-t"></div>

      <div className="grid grid-cols-2 gap-4">

        {[1, 2, 3, 4].map((item) => (

          <div key={item}>

            <div className="h-3 w-20 rounded bg-gray-100"></div>

            <div className="mt-2 h-5 w-12 rounded bg-gray-200"></div>

          </div>

        ))}

      </div>

      <div className="mt-6 h-10 rounded-xl bg-gray-200"></div>

    </div>
  );
}