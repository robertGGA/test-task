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
    if (!config?.panelClass) {
      dialogRef = dialog.openFromComponent(component, {...config, panelClass: 'dialog'});
    } else {
      dialogRef = dialog.openFromComponent(component, config);
    }

  } else {
    throw new Error('Add component ref');
  }

  const parentContainer = dialogRef.componentInstance

  // dialogRef.beforeOpened().subscribe(() => parentContainer?.classList.add('on-top'));
  //
  // dialogRef.afterClosed().subscribe(() => parentContainer?.classList.remove('on-top'));

  return dialogRef;
}
