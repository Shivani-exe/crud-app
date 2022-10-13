import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private snackbar:MatSnackBar,
  ) {}

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteProduct() {
    this.api.deleteProduct(this.deleteData.id).subscribe({
      next: () => {
        // alert('Product Deleted Successfully');
        this.dialogRef.close();
        this.snackbar.open("Item Deleted","Dismiss",{
          duration: 1000,
        })
      },
      error: () => {
        this.snackbar.open("Error while deleting the record","Dismiss");
      },
    });
  }
}
