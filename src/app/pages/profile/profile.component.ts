import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit} from '@angular/core';
import {UserService} from "@services/user.service";
import {DestroyService} from "@services/destroy.service";
import {takeUntil} from "rxjs";
import {Pass} from "@models/table-model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

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

  @ViewChild('paginator') paginator?: MatPaginator;

  constructor(private userService: UserService, private destroy$: DestroyService, private cdr: ChangeDetectorRef) {
  }

  getKeys(array: Array<Pass>) {
    if (array.length) {
      this.vars = [...Object.keys(array[0])];
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit(): void {
    this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.data = [...value.passes];
      this.getKeys(value.passes);
      this.length = value.meta.size;
    })
  }

  handlePageEvent(e: PageEvent) {
    this.userService.getUsers('', e.pageSize, e.pageIndex * e.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.data = [...value.passes];
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
      });
  }


}
