import ViewBrain from "@/app/components/Brain/View/Index";

export default function View({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen h-full bg-stone-200">
      <ViewBrain slug={params.slug} />
    </div>
  );
}