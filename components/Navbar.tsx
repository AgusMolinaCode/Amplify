import { SiCarthrottle } from "react-icons/si";
import { BsSearch, BsPersonCircle } from "react-icons/bs";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Signed from "../clerk/Signed";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const { isSignedIn } = useAuth();
  const [loadSigned, setLoadSigned] = useState(false);

  useEffect(() => {
    setLoadSigned(true);
  }, []);

  return (
    <div>
      <div className="pt-5 px-2 md:px-20 gap-2 md:gap-4 flex items-center justify-between">
        <Link href="/">
          <SiCarthrottle className="text-6xl md:text-7xl p-2 rounded-s-3xl rounded-t-3xl bg-slate-900 border-2 text-primary" />
        </Link>

        <div className="flex items-center justify-between gap-4">
          {/* <div className="relative z-10 right-0">
            <input
              type="text"
              className="border-[1px] border-primary bg-slate-900 rounded-3xl p-1 md:pl-3 md:pr-10 font-principal text-primary"
              style={{ outline: "none" }}
            />
            <button className="absolute top-0 bottom-0 right-2 flex items-center justify-center text-lg border-none p-0 w-auto">
              <BsSearch className="text-primary" />
            </button>
          </div> */}

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <button className="button1">
                <span className="spark__container">
                  <span className="spark" />
                </span>
                <span className="backdrop" />
                <div className="text hidden md:block font-principal text-primary z-10 font-bold text-xl">
                  {isSignedIn ? (
                    <Link href="/account">Publicar</Link>
                  ) : (
                    <Link href="/sign-in">Ingresar</Link>
                  )}
                </div>
              </button>
            </div>

            <div>
              {isSignedIn ? (
                <Link href="/account">
                  <BsPersonCircle className="text-primary block md:hidden z-10 text-3xl" />
                </Link>
              ) : (
                <Link href="/sign-in">
                  <BsPersonCircle className="text-primary block md:hidden z-10 text-3xl" />
                </Link>
              )}
            </div>
            {loadSigned && <Signed />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
