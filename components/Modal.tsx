//Modal.tsx
import { CarProps } from "@types";
import React from "react";
import CarCard_ from "./CarCard_";
import Form from "./Form";

interface ModalProps {
  car: CarProps;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ car, closeModal }) => (
  <dialog open className="modal">
    <div className="modal-box w-11/12 max-w-5xl">
      <div className="border-b-[1px] pb-2">
        <h3 className="text-[33px] font-light text-gray-400">
          Rent Your Car Now!
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <CarCard_ car={car} />
        </div>
        <></>
        <div>
          <Form car={car} onSubmit={function (): void {
            throw new Error("Function not implemented.");
          } } onClose={function (): void {
            throw new Error("Function not implemented.");
          } } address={""}/>
        </div>
      </div>
      <div className="modal-action">
        <button className="btn" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  </dialog>
);

export default Modal;