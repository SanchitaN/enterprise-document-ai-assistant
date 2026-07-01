import DocumentCardSkeleton from "./DocumentCardSkeleton";

export default function DocumentGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {Array.from({ length: 6 }).map((_, index) => (

        <DocumentCardSkeleton key={index} />

      ))}

    </div>
  );
}