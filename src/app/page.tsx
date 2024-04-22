// import { redirect } from "next/navigation";
import AppHeader from "@/app/components/UI/AppHeader";
import AppFooter from "@/app/components/UI/AppFooter";
import { AppButton, AppIcon } from "./components/DS/Index";
import Underline from "@/app/components/UI/Underline";
import PageFeatures from "@/app/components/UI/PageFeatures";
import "./landing.css";
export default async function Home({}) {
  // redirect("/login");

  return (
    <div className="">
      <div className="min-h-screen relative container px-0">
        <div className="w-1/3 mx-auto">
          <div className="bg-landing"></div>
        </div>
        <AppHeader />
        <div className="guides">
          <div className={`guides-container `}>
            <div className="guide"></div>
            <div className="guide"></div>
            <div className="guide md:block hidden"></div>
            <div className="guide md:block hidden"></div>
          </div>
        </div>

        <div className="relative z-10">
          <div>
            <div className="w-full text-center pb-20 pt-10">
              <div className="mb-5">
                <h1 className="text-black font-bold lg:w-full text-3xl md:text-5xl lg:text-7xl tracking-tighter xl:pr-10">
                  Dashboards y APIS
                  <br /> <span className="font-light italic">en segundos</span>
                </h1>

                <div className="w-2/3 lg:w-1/3 mt-5 mx-auto overflow-hidden">
                  <Underline />
                </div>
              </div>
              <div className="mb-5 lg:pr-32 w-full">
                <div className="overflow-hidden md:w-full">
                  <div className="scroll-underline inline">
                    <div className="m-scroll"></div>
                  </div>
                </div>
              </div>
              <div className="font-light">
                <div className="text-sm mx-auto lg:text-lg md:text-lg mt-5 text-neutral-600 font-light lg:w-1/3 mb-5 px-3">
                  Create dashboards, backoffices, API endpoints in seconds to
                  your app
                </div>
                <AppButton
                  icon="developer"
                  text="Join beta"
                  variant="primary"
                  size="lg"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>

          <PageFeatures />

          <div className="grid grid-cols-1 md:gap-0 gap-6 md:grid-cols-3 mb-10 text-stone-600">
            <div>
              <div className="mx-3 px-5 rounded-2xl border-2 hover:bg-white border-stone-200 py-10 group hover:shadow-xl transition">
                <img
                  src="/website/logo-bemovil.svg"
                  className="grayscale group-hover:grayscale-0 h-8"
                />
                <div className="mt-10">
                  <p className="font-light text-sm">
                    Hemos decidido apostar por las nuevas tecnologías, por el
                    cambio de dinámicas, ahora nuestra propia plataforma se
                    construye a sí misma por medio de inteligencia artificial,
                    hemos sido capaces de lograr una innovación tal que estamos
                    reinventando la forma en la que escalamos y desarrollamos
                    software, siendo capaces de ir a otro ritmo y lograr cosas
                    que antes nos tomaban días o semanas en solo segundos.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-5 mt-5">
                  <div className="font-light">
                    <div>Isabel Fernandez</div>
                    <div className="text-sm text-stone-600">COO Bemovil</div>
                  </div>
                  <div>
                    <img
                      src="/website/isabel.jpeg"
                      className="object-cover h-10 rounded-full "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mx-3 px-5 rounded-2xl border-2 hover:bg-white border-stone-200 py-10 group hover:shadow-xl transition">
                <img
                  src="/website/logo-pronty.svg"
                  className="grayscale group-hover:grayscale-0 h-8"
                />
                <div className="mt-10">
                  <p className="font-light text-sm">
                    En general, recomendaría encarecidamente esta empresa a
                    cualquiera que busque una solución de software confiable y
                    flexible. Su enfoque en la seguridad de los datos y la
                    experiencia del cliente realmente los destaca en el mercado.
                    Estoy muy contento de haber elegido trabajar con ellos y
                    espero una relación continua y fructífera en el futuro.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-5 mt-5">
                  <div className="font-light">
                    <div>Santiago Ruiz</div>
                    <div className="text-sm text-stone-600">CEO Pronty</div>
                  </div>
                  <div>
                    <img
                      src="/website/santiago.jpeg"
                      className="object-cover h-10 rounded-full "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mx-3 px-5 rounded-2xl border-2 hover:bg-white border-stone-200 py-10 group hover:shadow-xl transition">
                <img
                  src="/website/logo-vexo.svg"
                  className="grayscale group-hover:grayscale-0 h-8"
                />
                <div className="mt-10">
                  <p className="font-light text-sm">
                    Como cliente de esta empresa, debo decir que estoy muy
                    impresionado con la solución que ofrecen. El hecho de poder
                    utilizar su software on-premise y tener la tranquilidad de
                    que mis datos están seguros en mi propia infraestructura es
                    una gran ventaja para mi negocio.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-5 mt-5">
                  <div className="font-light">
                    <div>Catalina Valencia</div>
                    <div className="text-sm text-stone-600">COO Vexo</div>
                  </div>
                  <div>
                    <img
                      src="/website/catalina.png"
                      className="object-cover h-10 rounded-full "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" lg:w-1/3 mx-auto mb-10">
            <div className="mx-3 bg-gray-100 rounded-xl p-5 md:py-10 h-full card-border-animated overflow-hidden relative text-center">
              <div className="-top-20 -right-20 bg-pink-500 w-64 h-40 blur-circle"></div>
              <div className="top-0 -right-20 bg-blue-500 w-64 h-40 blur-circle animate-bounce"></div>
              <div className="bottom-10 right-20 bg-yellow-500 w-64 h-64 blur-circle"></div>
              <div className="relative z-10">
                <div className="mb-2 md:mb-5">
                  <h1 className="text-black font-bold lg:w-full text-2xl md:text-3xl lg:text-4xl tracking-tighter">
                    Make your business efficient in seconds.
                  </h1>
                </div>
                <div className="font-light ">
                  <div className="text-base lg:text-lg md:text-lg text-neutral-600 font-light mb-5">
                    Create dashboards and backoffices in seconds
                  </div>
                  <AppButton
                    icon="developer"
                    text="Start"
                    variant="primary"
                    size="lg"
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
