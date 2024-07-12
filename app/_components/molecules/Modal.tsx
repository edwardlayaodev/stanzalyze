import { useState } from "react";
import { Atom } from "../atoms";

interface Button {
  label: string;
  disabled?: boolean;
  type: "btn-primary" | "btn-secondary";
  icon?: React.ReactNode;
}

interface modalProps {
  title: string;
  message?: string;
}

interface inputProps {
  placeholder?: string;
  setter: any;
  getter: string;
}

interface actionBtnProps extends Button {
  handler: any;
}

interface Props {
  type: "dialog" | "input";
  openBtnProps: Button;
  cancelBtnProps: Button;
  modalProps: modalProps;
  inputProps?: inputProps;
  actionBtnProps?: actionBtnProps;
}

export default function Modal({
  type,
  modalProps,
  inputProps,
  actionBtnProps,
  openBtnProps,
  cancelBtnProps,
}: Props) {
  function handleClick() {
    const dialog = document.getElementById("target") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  }

  function isValid() {
    return type == "input" && inputProps?.getter != "";
  }

  function handleCancel() {
    inputProps?.setter("");
  }

  function handleChange(e: any) {
    inputProps?.setter(e.target.value);
  }

  function handleAction() {
    actionBtnProps?.handler();
  }

  return (
    <>
      <button
        disabled={openBtnProps.disabled}
        className={`btn ${openBtnProps.type}`}
        onClick={handleClick}
      >
        {openBtnProps.icon}
        {openBtnProps.label}
      </button>
      <dialog id="target" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalProps.title}</h3>
          <p className="py-4">{modalProps.message}</p>
          <Atom.Visibility state={type == "input"}>
            <input
              onChange={handleChange}
              className="input"
              type="text"
              placeholder={inputProps?.placeholder}
              value={inputProps?.getter}
            />
          </Atom.Visibility>
          <div className="modal-action">
            <form className="flex flex-row gap-2" method="dialog">
              <Atom.Visibility state={!!actionBtnProps}>
                <button
                  onClick={handleAction}
                  className={`btn ${actionBtnProps?.type}`}
                >
                  {actionBtnProps?.icon}
                  {actionBtnProps?.label}
                </button>
              </Atom.Visibility>
              <button
                disabled={cancelBtnProps.disabled}
                onClick={handleCancel}
                className="btn btn-secondary"
              >
                {cancelBtnProps.icon}
                {cancelBtnProps.label}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
