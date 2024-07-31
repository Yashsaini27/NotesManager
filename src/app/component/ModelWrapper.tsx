import { Dialog, Transition } from "@headlessui/react";
import { ShareOutlined, StarBorderOutlined } from "@mui/icons-material";
import { Fragment, useRef, ReactNode } from "react";

interface ModalWrapperProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ open, setOpen, children }) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
        </Transition.Child>

        <div className={`fixed right-0 top-0 h-full bg-white shadow-lg w-[600px] p-8 overflow-auto transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg text-left transition-all">
              {/* Close Button (Positioned Above the Title) */}
              <button
                type="button"
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 z-20"
                onClick={() => setOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Share and Favourite Buttons */}
              <div className=" absolute top-4 right-4 flex space-x-2 z-20 ">
                <button className="navbar-button">
                 Share <ShareOutlined />
                  
                </button>
                <button className="navbar-button">
                  Favourite<StarBorderOutlined />
                 
                </button>
              </div>

              <div className="pt-12 relative">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;
