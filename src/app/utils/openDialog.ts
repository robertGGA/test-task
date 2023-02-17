import {Dialog, DialogConfig, DialogRef} from "@angular/cdk-experimental/dialog";
import {ComponentType} from "@angular/cdk/overlay";

export interface OpenDialogData {
  dialog: Dialog,
  component: ComponentType<any>,
  config?: DialogConfig;
}

export const openDialog = <T>({dialog, component, config = {}}: OpenDialogData): DialogRef<T> => {
  let dialogRef;
  if (component) {
    dialogRef = dialog.openFromComponent(component, config);
  } else {
    throw new Error('Add component ref');
  }
  return dialogRef;
}
