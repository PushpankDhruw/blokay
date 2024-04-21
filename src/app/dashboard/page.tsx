import ListViews from "@/app/components/Brain/ListViews";
import Menu from "@/app/components/Menu/Menu";
export default function Home() {
  return (
    <div className="min-h-screen  bg-stone-200 pt-8">
      <div className="mx-auto container">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <Menu />
          </div>
          <div className="col-span-9 px-10">
            <div className="relative pb-10">
              <ListViews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
