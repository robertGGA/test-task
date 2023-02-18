import {Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {UserService} from "@services/user.service";
import {DestroyService} from "@services/destroy.service";
import {debounceTime, startWith, switchMap, takeUntil} from "rxjs";
import {Pass} from "@models/table-model";
import {PageEvent} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {Dialog} from "@angular/cdk-experimental/dialog";
import {openDialog} from "@utils/openDialog";
import {PushModalComponent} from "@pages/profile/push-modal/push-modal.component";

interface ColumnData {
  name: string,
  isSorted: boolean
}

@Component({
  selector: 'rg-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements AfterViewInit {
  data: Array<Pass> = [];
  vars: Array<ColumnData> = [];
  pageSize: number = 10;
  length: number = 0;
  pageIndex = 0;
  pageEvent?: PageEvent;
  searchControl = new FormControl('');

  constructor(private userService: UserService,
              private destroy$: DestroyService,
              private cdr: ChangeDetectorRef,
              private dialog: Dialog,) {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      switchMap((row: string) => {
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
      this.vars = Object.keys(array[0]).map(columnName => {
        return {
          name: columnName,
          isSorted: false
        }
      })
      this.cdr.markForCheck();
    }
  }

  getColumnsHeader() {
    return this.vars.map(obj => obj.name);
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

  sort(e: string) {
    const lowToHigh = this.updateStateOfHeader(e)!.isSorted;
    this.data = [...this.data.sort((first, second) => {
      if (first[e as keyof Pass]! > second[e as keyof Pass]!) {
        if (lowToHigh) {
          return 1
        } else {
          return -1;
        }
      }
      if (first[e as keyof Pass]! < second[e as keyof Pass]!) {
        if (lowToHigh) {
          return -1
        } else {
          return 1
        }
      }
      return 0;
    })];
    this.cdr.markForCheck();
  }


  private updateStateOfHeader(e: string) {
    this.vars.forEach(obj => {
      if (e !== obj.name) {
        obj.isSorted = false
      }
    });
    const result = this.vars.find(obj => obj.name === e);
    result!.isSorted = !result!.isSorted;
    this.vars = [...this.vars];

    return result;
  }

}
