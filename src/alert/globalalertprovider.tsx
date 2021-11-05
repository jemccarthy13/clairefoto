import React, { CSSProperties } from "react";

// External Alert Utilities
import { SnackbarKey, SnackbarProvider } from "notistack";

// Internal Alert Utilities
import snackActions, { SnackbarUtilsConfigurator } from "./alert";

// This style creates the button for dismissing a notification
// full width, full transparent btn to click anywhere on the notification
const transparentBtnStyle: CSSProperties = {
  height: "100%",
  left: 0,
  position: "absolute",
  top: 0,
  width: "100%",
  backgroundColor: "Transparent",
  backgroundRepeat: "no-repeat",
  outline: "none",
};

/**
 * A top level Component that Provides a snackbar context and
 * snackbar area, and the framework to allow notifications
 * throughout the app
 */
export default class GlobalAlertProvider extends SnackbarProvider {
  /**
   * Wrapper function so it can be used as onClick
   *
   * @param key the snackbarkey of the notification to dismiss
   * @returns an onClick-compatible dismiss function
   */
  dismissNotification = (key: SnackbarKey): (() => void) => {
    return () => {
      snackActions.closeSnackbar(key);
    };
  };

  /**
   * Provides the element to render for dismissal. In this case,
   * we use the transparent CSS to create the effect of dismissal
   * by clicking anywhere on the notification (instead of a
   * clickable "Dismiss" text)
   *
   * @param key the SnackbarKey of the notification to dismiss
   * @returns React.ReactElement to render
   */
  dismissElement = (key: SnackbarKey): React.ReactElement => {
    return (
      <button
        type="button"
        onClick={this.dismissNotification(key)}
        style={transparentBtnStyle}
      />
    );
  };

  /**
   * @returns Children element, wrapped in the global alert context
   */
  render(): React.ReactElement {
    // Take the children out of the props, so children are rendered
    const { children, ...other } = this.props;
    return (
      <SnackbarProvider {...other} action={this.dismissElement}>
        <SnackbarUtilsConfigurator />
        {children}
      </SnackbarProvider>
    );
  }
}
