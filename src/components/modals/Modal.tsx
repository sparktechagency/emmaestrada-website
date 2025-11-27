import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";

type ModalProps = {
  dialogTrigger?: React.ReactNode;
  children?: React.ReactNode;
  dialogTitle?: React.ReactNode;
  className?: string;
  open?: boolean;
  setOpen?: (v: boolean) => void;
  width?: string | number;   // new
  height?: string | number;  // new
};

const Modal = ({
  dialogTrigger,
  dialogTitle,
  children,
  className,
  open,
  setOpen,
  width,
  height,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>

      <DialogContent
        className={`rounded-xl ${className || ""}`}
        style={{
          width: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
          height: height ? (typeof height === "number" ? `${height}px` : height) : "auto",
          maxWidth: "100%",   // prevent overflow
          overflowY: "auto",  // prevent overflow
        }}
      >
        <DialogHeader >
          {dialogTitle && (
            <DialogTitle className="text-xl font-semibold ">{dialogTitle}</DialogTitle>
          )}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
