import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function ModalCommon({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none bg-gray-950"
      onClose={onClose}
    >
      {/* Overlay - background blur and dark tint */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-10 w-full overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-xl rounded-xl bg-gray-950 p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            {/* Header */}
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              <div className="flex justify-between">
                {title}
                <button
                  onClick={onClose}
                  className="text-white hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </DialogTitle>

            {/* Modal Content */}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
