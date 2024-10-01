import Modal from "react-modal";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react";
import useModalHotkey from "app/hooks/useModalHotkey";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ReactModal: ForwardRefRenderFunction<any, any> = (
  props: any,
  ref: any
) => {
  const [state, setState] = useState({
    isLoading: false as boolean,
    childrenComponent: (_props: any) => "" as any,
    childrenProps: {} as any,
    modalProps: {} as any,
    open: false as boolean,
    closeCallback: (() => {}) as Function,
    afterOpenModal: ((obj: any) => {}) as any,
    disabledBackdrop: false,
    disableCloseable: false,
  });

  useModalHotkey(state, setState)

  useImperativeHandle(ref, () => ({
    replaceChildren: (childrenComponent: any) => {
      setState((prev) => ({
        ...prev,
        childrenComponent,
      }));
    },
    dangerousUpdateState: (key: string, value: any) => {
      setState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    updateChildrenProps: (props: any) => {
      setState((prev) => ({
        ...prev,
        childrenProps: props,
      }));
    },
    updateModalProps: (props: any) => {
      setState((prev) => ({
        ...prev,
        modalProps: props,
      }));
    },
    openModal: () => {
      setState((prev) => ({
        ...prev,
        open: true,
      }));
    },
    closeModal: () => {
      setState((prev) => ({
        ...prev,
        open: false,
      }));
    },
    addCloseCallback: (callback?: Function) => {
      if (callback)
        setState((prev) => ({
          ...prev,
          closeCallback: callback,
        }));
    }
  }));

  const handleCloseModal = () => {
    setState((prev) => ({
      ...prev,
      open: false,
    }));
    state.closeCallback();
  }
  
  return (
    <Modal
      isOpen={state.open}
      onAfterOpen={state.afterOpenModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
    >
      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          cursor: "pointer",
        }}
        onClick={handleCloseModal}
      >
        <i className="fa-sharp fa-solid fa-xmark"></i>
      </div>
      {<state.childrenComponent {...(state.childrenProps || {})} />}
    </Modal>
  );
};

export default forwardRef(ReactModal);
