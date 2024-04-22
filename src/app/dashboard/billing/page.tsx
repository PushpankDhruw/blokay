import BillingView from "./components/BillingView";
import Menu from "@/app/components/Menu/Menu";
export default function Billing() {
  return (
    <div className="min-h-screen  pt-8">
      <div className="mx-auto container">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <Menu />
          </div>
          <div className="col-span-9 px-10">
            <div className="relative pb-10">
              <BillingView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
