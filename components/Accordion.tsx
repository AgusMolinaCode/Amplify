import React from "react";
import { Disclosure } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

interface AccordionProps {
  descripcion: string;
  onClick: (isOpen: boolean) => void;
}

const Accordion = ({ descripcion, onClick }: AccordionProps) => {
  return (
    <div className="w-full px-4 pt-2">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-gray-700 p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-800 px-4 py-2 text-left text-md md:text-lg font-medium text-primary hover:bg-gray-600 duration-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 font-principal" onClick={() => onClick(open)}>
                <span>Descripcion</span>
                <AiFillCaretDown
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-rose-300 flex items-center justify-center mt-1`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <p
                  className="text-lg font-principal text-primary"
                >{descripcion}</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Accordion;