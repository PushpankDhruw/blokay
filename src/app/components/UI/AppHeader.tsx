import Image from "next/image";
import Link from "next/link";
import { AppButton } from "../DS/Index";
import AppMenuResponsive from "./AppMenuResponsive";

const Header = ({ variant = "yellow" }) => {
  return (
    <div className="pt-20">
      <div className="w-full fixed top-5 z-10 left-0 md:px-0 px-5">
        <div className="lg:w-[50rem] mx-auto flex justify-between content-center  items-center bg-white/80 px-3 md:px-3 py-1 md:py-1.5 rounded-2xl border border-slate-200 backdrop-blur-md shadow-md text-slate-500">
          <div className="flex items-center gap-10">
            <div className="md:w-20 w-20  relative">
              <a href="/">
                <img src="/logo-black.svg" alt="logo segurosvexo, seguros" />
              </a>
            </div>
            <ul className="text-slate-500 text-sm  hidden md:flex gap-1 items-center ">
              <li>
                <Link
                  href="/seguros-autos"
                  className="py-1 px-3 rounded-lg hover:bg-transparent hover:text-black"
                >
                  Seguro autos
                </Link>
                <Link
                  href="/seguros-salud"
                  className="py-1 px-3 rounded-lg hover:bg-transparent hover:text-black"
                >
                  Seguro salud
                </Link>
              </li>
              <li>
                <Link
                  href="/seguros-mascotas"
                  className="py-1 px-3 rounded-lg hover:bg-transparent hover:text-black"
                >
                  Seguro mascotas
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="py-1 px-3 rounded-lg hover:bg-transparent hover:text-black"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className=" flex items-center gap-3 text-black">
            <AppButton
              text="WhatsApp"
              target="_blank"
              href={`https://api.whatsapp.com/send?phone=573238658077&text=${encodeURIComponent(
                "Hola, quiero mas información para comprar mi seguro"
              )}`}
              size="md"
              icon="whatsapp"
              variant="primary"
              color={variant}
            />

            <AppMenuResponsive variant={variant} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
