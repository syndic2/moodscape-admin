import { Component, OnInit, OnDestroy, Output, ViewChild, EventEmitter } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Theme } from 'src/app/models/theme.model';
import { showDialog } from 'src/app/store/actions/application.actions';
import { fetchThemes, removeThemesConfirmation } from 'src/app/store/actions/theme.actions';
import { getThemes } from 'src/app/store/selectors/theme.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ThemeDetailModalComponent } from '../theme-detail-modal/theme-detail-modal.component';

@Component({
  selector: 'list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.scss']
})
export class ListThemeComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public tableColumns: string[]= ['name', 'primaryColor', 'isActive', 'actions'];
  public tableDataSource: MatTableDataSource<Theme>;
  private getThemesSubscription: Subscription;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.getThemesSubscription= this.store.select(getThemes).subscribe(res => {
      if (!res.length) {
        this.loadThemes();
      }

      this.tableDataSource= new MatTableDataSource([...res]);
      this.tableDataSource.sort = this.sort;
      this.tableDataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.getThemesSubscription && this.getThemesSubscription.unsubscribe();
  }

  loadThemes() {
    this.store.dispatch(fetchThemes());
  }

  onSearch(event: Event) {
    const field= (event.target as HTMLInputElement).value;
    this.tableDataSource.filter= field.trim().toLowerCase();

    if (this.tableDataSource.paginator) this.tableDataSource.paginator.firstPage();
  }

  onViewEdit(theme: Theme, isEditMode: boolean= false) {
    this.store.dispatch(showDialog({
      component: ThemeDetailModalComponent,
      config: {
        //...isEditMode && { width: '50rem' },
        maxWidth: '85%',
        data: {
          theme: theme,
          isEditMode: isEditMode
        }
      }
    }));
  }

  onRemove(theme: Theme) {
    this.store.dispatch(removeThemesConfirmation({ themeIds: [theme.Id] }));
  }
}
