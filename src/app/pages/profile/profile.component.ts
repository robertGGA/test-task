import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit} from '@angular/core';
import {UserService} from "@services/user.service";
import {DestroyService} from "@services/destroy.service";
import {debounceTime, startWith, switchMap, takeUntil} from "rxjs";
import {Pass} from "@models/table-model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {Dialog} from "@angular/cdk-experimental/dialog";
import {openDialog} from "@utils/openDialog";
import {PushModalComponent} from "@pages/profile/push-modal/push-modal.component";

@Component({
  selector: 'rg-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements AfterViewInit {
  data: Array<Pass> = [];
  vars: Array<string> = [];
  pageSize: number = 10;
  length: number = 0;
  pageIndex = 0;
  pageEvent?: PageEvent;
  searchControl = new FormControl('');

  @ViewChild('paginator') paginator?: MatPaginator;

  constructor(private userService: UserService,
              private destroy$: DestroyService,
              private cdr: ChangeDetectorRef,
              private dialog: Dialog,) {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      switchMap((row: string) => {
        let searchRow = row.split(' ');
        console.log(searchRow);
        return this.userService.getUsers(row)
      }),
      takeUntil(this.destroy$),
    ).subscribe(value => {
      this.data = [...value.passes];
      this.cdr.markForCheck();
    })
  }

  getKeys(array: Array<Pass>) {
    if (array.length) {
      this.vars = [...Object.keys(array[0])];
      this.cdr.markForCheck();
    }
  }

  showVal(e: any) {
    console.log(e);
  }

  ngAfterViewInit(): void {
    this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.data = [...value.passes];
      this.getKeys(value.passes);
      this.length = value.meta.size;
    })
  }

  handlePageEvent(e: PageEvent) {

    this.userService.getUsers(this.searchControl.value, e.pageSize, e.pageIndex * e.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.data = [...value.passes];
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
      });
  }

  openMessageModal(row: Pass) {
    openDialog({
      component: PushModalComponent, dialog: this.dialog, config: {
        data: {
          userId: row.user_id,
          userFirstName: row.first_name,
          userSecondName: row.last_name
        }
      }
    });
  }


}
