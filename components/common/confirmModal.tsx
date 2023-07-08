import React, { FC } from "react";
import ModalContainer, { ModalProps } from "./ModalContainer";
import classNames from "classnames";
import { ImSpinner3 } from "react-icons/im";

interface Props extends ModalProps {
  title: string;
  subTitle: string;
  busy?: boolean;
  onCancel?(): void;
  onConfirm?(): void;
}

const commonClass = "px-3 py-1 text-white rounded";

const ConfirmModal: FC<Props> = ({
  onClose,
  visible,
  subTitle,
  title,
  busy = false,
  onCancel,
  onConfirm,
}): JSX.Element => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="bg-primary-dark dark:bg-primary rounded p-3 ">
        <p className="text-primary dark:text-primary-dark font-semibold text-lg">
          {title}
        </p>
        <p className="text-primary dark:text-primary-dark"> {subTitle} </p>
        {busy && (
          <p className="flex items-center space-x-2 dark:text-primary-dark text-primary pt-2">
            <ImSpinner3 className="animate-spin" />
            <span>Please Wait</span>
          </p>
        )}
        {!busy && (
          <div className="flex items-center space-x-2 pt-2  ">
            <button className={classNames(commonClass, "bg-red-500")}>
              Confirm
            </button>
            <button className={classNames(commonClass, "bg-blue-500")}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
