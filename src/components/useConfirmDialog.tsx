import { useCallback, useEffect, useState } from "react";
import ConfirmDialog from "./newconfirmdialog";

export interface ConfirmDialogConfig {
  title: string;
  isOpen: boolean;
  description: string;
  confirmAction: () => any;
  cancelAction: () => any;
}

export function useConfirmDialog(config: ConfirmDialogConfig, deps: any) {
  const [isOpen, setOpen] = useState(config.isOpen);

  const confirmAct = useCallback(() => {
    config.confirmAction();
  }, [config]);

  const cancelAct = useCallback(() => {
    config.cancelAction();
  }, [config]);

  useEffect(() => {
    setOpen(config.isOpen);
  }, [config.isOpen]);

  const onCancel = () => {
    setOpen(false);
    cancelAct();
  };

  const onConfirm = () => {
    setOpen(false);
    confirmAct();
  };

  return (
    <ConfirmDialog
      title={config.title}
      open={isOpen}
      onCancel={onCancel}
      onConfirm={onConfirm}
      description={config.description}
    />
  );
}
