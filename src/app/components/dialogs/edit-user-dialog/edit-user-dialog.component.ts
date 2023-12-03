import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCheckboxModule,
} from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserDialogComponent {
  form!: FormGroup;
  accessForm!: FormGroup;
  roles: any = [];

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  initForm(): void {
    this.form = this.fb.group({
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      username: [this.data.username, Validators.required],
    });

    const formControls: { [key: string]: any } = {};
    this.roles.forEach((item: { key: string | number; value: any }) => {
      formControls[item.key] = this.fb.control(item.value);
    });
    this.accessForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    this.roles = Object.keys(this.data.access).map((key) => ({
      key,
      value: this.data.access[key],
    }));
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
