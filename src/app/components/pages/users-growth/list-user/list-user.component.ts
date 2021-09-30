import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { showDialog } from 'src/app/store/actions/application.actions';
import { fetchUsers, removeUsersConfirmation } from 'src/app/store/actions/user.actions';
import { getUsers } from 'src/app/store/selectors/user.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { UserDetailModalComponent } from '../user-detail-modal/user-detail-modal.component';

@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tableColumns: string[]= ['email', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'joinedAt', 'status', 'actions'];
  public tableDataSource: MatTableDataSource<User>;
  private getUsersSubscription: Subscription;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.getUsersSubscription= this.store.select(getUsers).subscribe(res => {
      if (!res.length) {
        this.loadUsers();
      } else {
        this.tableDataSource= new MatTableDataSource([...res]);
        this.tableDataSource.sort = this.sort;
        this.tableDataSource.paginator = this.paginator;
      }
    });
  }

  ngOnDestroy() {
    this.getUsersSubscription && this.getUsersSubscription.unsubscribe();
  }

  loadUsers() {
    this.store.dispatch(fetchUsers());
  }

  onSearch(event: Event) {
    const field= (event.target as HTMLInputElement).value;
    this.tableDataSource.filter= field.trim().toLowerCase();

    if (this.tableDataSource.paginator) this.tableDataSource.paginator.firstPage();
  }

  onViewEdit(user: User, isEditMode: boolean= false) {
    this.store.dispatch(showDialog({
      component: UserDetailModalComponent,
      config: {
        ...isEditMode && { width: '30rem' },
        maxWidth: '50%',
        data: {
          user: user,
          isEditMode: isEditMode
        }
      }
    }));
  }

  onRemove(user: User) {
    this.store.dispatch(removeUsersConfirmation({ userIds: [user.Id] }));
  }
}
