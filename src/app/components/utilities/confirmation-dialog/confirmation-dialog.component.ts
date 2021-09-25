import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  private checkBoxChecked: boolean= false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit(): void {
  }

  onCheck(event) {
    this.checkBoxChecked= event.source.checked;
  }

  onConfirm(confirmation: string) {
    this.dialogRef.close({ confirmation: confirmation, checkBoxChecked: this.checkBoxChecked });
  }
}
