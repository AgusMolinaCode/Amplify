import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-gray-500 bg-opacity-20 border-t-2 rounded-tl-3xl rounded-tr-3xl md:rounded-tl-full md:rounded-tr-full mt-16 h-22 pb-2 border-gray-500">
      <div className="flex flex-col mt-2 justify-center h-full">
        <div className="flex flex-wrap justify-center gap-2 px-20 items-end">

        <p className="text-center font-principal text-lg text-pink-300 opacity-80">
          Desarrollado por:{' '}
        </p>
        <p className="text-lg sm:text-2xl text-center text-primary">
          Agustin Molina
        </p>
        </div>
        <div className="flex justify-center gap-3 mt-2">
          <Link
            href="https://www.linkedin.com/in/agustin-molina-8a1b0a1b0/"
            target="_blank"
          >
            <BsLinkedin className="text-3xl hover:text-blue-300 duration-300 text-primary ml-2 cursor-pointer" />
          </Link>
          <Link href="https://github.com/AgusMolinaCode" target="_blank">
            <BsGithub className="text-3xl text-primary hover:text-blue-300 duration-300 ml-2 cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
