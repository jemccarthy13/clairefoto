import {
  OptionsObject,
  SnackbarKey,
  useSnackbar,
  WithSnackbarProps,
} from "notistack";
import React from "react";

// Set up a global snackbar reference for use to enqueue and dismiss
// snack notifications
let snackbarRef: WithSnackbarProps;
export const SnackbarUtilsConfigurator: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};

/**
 * The SnackActions global exported object to make notifications
 */
const SnackActions = {
  /**
   * Enqueue a green snackbar notification (success)
   * @param msg Text to display
   * @param options Snackbar options object
   * @returns SnackbarKey, string|number
   */
  success(msg: string, options: OptionsObject = {}): SnackbarKey {
    return this.toast(msg, { ...options, variant: "success" });
  },
  /**
   * Enqueue a yellow/orange snackbar notification (warning)
   * @param msg Text to display
   * @param options Snackbar options object
   * @returns SnackbarKey, string|number
   */
  warning(msg: string, options: OptionsObject = {}): SnackbarKey {
    return this.toast(msg, { ...options, variant: "warning" });
  },
  /**
   * Enqueue a blue snackbar notification (info)
   * @param msg Text to display
   * @param options Snackbar options object
   * @returns SnackbarKey, string|number
   */
  info(msg: string, options: OptionsObject = {}): SnackbarKey {
    return this.toast(msg, { ...options, variant: "info" });
  },
  /**
   * Enqueue a red snackbar notification (error)
   * @param msg Text to display
   * @param options Snackbar options object
   * @returns SnackbarKey, string|number
   */
  error(msg: string, options: OptionsObject = {}): SnackbarKey {
    return this.toast(msg, { ...options, variant: "error" });
  },
  /**
   * Close a snackbar using the given key
   * @param key string|number of the notification to dismiss
   */
  closeSnackbar(key: SnackbarKey): void {
    snackbarRef.closeSnackbar(key);
  },
  /**
   * Enqueue a snackbar using the given message and options
   * @param msg Text to display
   * @param options Snackbar options
   * @returns SnackbarKey, string|number
   */
  toast(msg: string, options: OptionsObject = {}): SnackbarKey {
    return snackbarRef.enqueueSnackbar(msg, options);
  },
};

export default SnackActions;
