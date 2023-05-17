import { ReactNode } from "react";

import "./Modal.scss";
import { useAppDispatch } from "../../../hooks/hooks";
import { clearActiveTask } from "../../../store/slices/taskSlice";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle?: () => void;
}

export default function Modal({ children, isOpen, toggle }: ModalType) {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(clearActiveTask());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-box">
          <button className="close-btn" onClick={handleCloseModal}>
            x
          </button>

          {children}
        </div>
      </div>
    </>
  );
}
