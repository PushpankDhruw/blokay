const Footer = () => {
  return (
    <div className="mx-auto container pb-10 px-3 md:px-10">
      <div className="footer bg-white rounded-3xl text-xs md:text-sm font-light py-10">
        <div className="container mx-auto px-3 lg:px-10 md:py-5 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 text-slate-900 items-start gap-5 flex-wrap">
            <div>
              <img
                src="/logo-black.svg"
                className="w-20 md:w-24 opacity-100 hover:opacity-80"
                alt="seguro carro, poliza salud"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold">Seguros Vexo</p>
              <p>Todos los derechos reservados</p>
              <p>Calle 93 19 03 - Bogotá</p>
              <p>(+57) 3238658077</p>
            </div>
            <div>
              <p className="font-bold mb-3">Menú</p>
              <ul className="gap-2 flex flex-col">
                <li>
                  <a href="/privacidad">POLÍTICA DE TRATAMIENTO DE DATOS</a>
                </li>
                <li>
                  <a href="/seguros-autos">Seguros autos</a>
                </li>
                <li>
                  <a href="/seguros-mascotas">Seguros Mascotas</a>
                </li>
                <li>
                  <a href="/seguros-salud">Seguros salud</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-3">Contacto</p>
              <p className="mb-3">contacto@segurosvexo.com</p>
              <p className="mb-3">(+57) 3238658077</p>
            </div>
          </div>

          <div className="mt-10 pt-5 border-t border-gray-200">
            En Vexo, entendemos el vínculo especial que tienes con tu mascota.
            Por eso, nos comprometemos a proteger a tus amigos peludos como si
            fueran los nuestros.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
