const CardPulse = () => {
    return (
        <div className="relative w-[310px] flex justify-center mx-auto mt-10">
        <div
          className="absolute -inset-2 rounded-lg bg-gradient-to-r from-slate-600 via-slate-500 to-slate-700 opacity-75 blur"
        />
        <div
          className="relative flex h-[180px] w-[300px] text-center px-2 font-principal text-[1.25rem] text-pink-300 items-center justify-center rounded-lg bg-black"
        >
          La plataforma perfecta para rentar o alquilar equipos de sonido, iluminación y DJ. Conecta con entusiastas y comparte tus recursos.
        </div>
      </div>
      
    );
  };
  
  export default CardPulse;
  