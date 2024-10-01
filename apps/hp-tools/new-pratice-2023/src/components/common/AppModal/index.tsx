import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react";
import { makeStyles, withStyles, createStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import ClearIcon from "@material-ui/icons/Clear";
import { AppTheme } from "themes";
import Flex from "components/common/Flex";
import { DialogTitle } from "@material-ui/core";

const DialogContent = withStyles((theme: AppTheme) => ({
  root: {
    borderTop: "none",
    borderBottom: "none",
  },
}))(MuiDialogContent);

const AppModal: ForwardRefRenderFunction<any, any> = (props: any, ref: any) => {
  const [state, setState] = useState({
    isLoading: false as boolean,
    childrenComponent: () => "" as any,
    childrenProps: {} as any,
    modalProps: {} as any,
    open: false as boolean,
    closeCallback: (() => {}) as Function,
    disabledBackdrop: false,
    disableCloseable: false,
  });
  const styles = useStyles(props);

  useImperativeHandle(ref, () => ({
    replaceChildren: (childrenComponent: any) => {
      setState((prev) => ({
        ...prev,
        childrenComponent,
      }));
    },
    dangerousUpdateState: (key, value) => {
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
    addCloseCallback: (callback) => {
      if (callback)
        setState((prev) => ({
          ...prev,
          closeCallback: callback,
        }));
    },
  }));

  return (
    <Dialog
      onClose={(e, reason) => {
        if (state.disabledBackdrop && reason === "backdropClick") {
          return false;
        } else {
          setState((prev) => ({
            ...prev,
            open: false,
          }));
          state.closeCallback();
          return true;
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={state.open}
      fullWidth
      maxWidth={"xl"}
      transitionDuration={{
        appear: 500,
        enter: 200,
        exit: 300,
      }}
      classes={{
        root: styles.root,
        paper: styles.root,
      }}
      {...state.modalProps}
    >
      {state.modalProps.title && (
        <DialogTitle>{state.modalProps.title}</DialogTitle>
      )}
      <DialogContent style={{}}>
        {!state.disableCloseable && (
          <Flex
            position={"absolute"}
            top={10}
            right={24}
            cursorPointer
            onClick={() => {
              setState((prev) => ({
                ...prev,
                open: false,
              }));
              state.closeCallback();
            }}
          >
            <ClearIcon style={{ color: "whitesmoke" }} />
          </Flex>
        )}
        {<state.childrenComponent {...state.childrenProps} />}
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      borderRadius: "1rem",
      boxShadow: "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
    },
  })
);

export default forwardRef(AppModal);
