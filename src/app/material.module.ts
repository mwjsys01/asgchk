import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
      MatButtonModule
     ,MatCardModule
     ,MatDialogModule
     ,MatFormFieldModule
     ,MatInputModule
     ,MatPaginatorModule
    //  ,MatProgressSpinnerModule
    //  ,MatSpinner
     ,MatSelectModule
     ,MatTableModule
     ,MatToolbarModule
  ],
  exports: [
      MatButtonModule
     ,MatCardModule
     ,MatDialogModule
     ,MatFormFieldModule
     ,MatInputModule
     ,MatPaginatorModule
    //  ,MatProgressSpinnerModule
    //  ,MatSpinner
     ,MatSelectModule
     ,MatTableModule
     ,MatToolbarModule
  ]
})
export class MaterialModule { }
