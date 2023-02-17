import {Component, ChangeDetectionStrategy, Inject, Optional} from '@angular/core';
import {Dialog, DIALOG_DATA} from "@angular/cdk-experimental/dialog";
import {FormControl} from "@angular/forms";
import {UserService} from "@services/user.service";
import {DestroyService} from "@services/destroy.service";
import {takeUntil} from "rxjs";

interface PushModalData {
  userId: number,
  userFirstName: string,
  userSecondName: string
}

@Component({
  selector: 'rg-push-modal',
  templateUrl: './push-modal.component.html',
  styleUrls: ['./push-modal.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PushModalComponent {
  messageInput = new FormControl('');

  constructor(@Optional() @Inject(DIALOG_DATA) public data: PushModalData,
              private userService: UserService,
              private destroy$: DestroyService,
              private dialog: Dialog,) {
  }

  sendMessage() {
    this.userService.sendMessage(this.data.userId, new Date(),
      this.messageInput.value).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dialog.closeAll();
      alert('Message delivered successfully')
    })
  }
}
