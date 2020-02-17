import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-dilog-user-edit',
  templateUrl: './dilog-user-edit.component.html',
  styleUrls: ['./dilog-user-edit.component.css']
})
export class DilogUserEditComponent implements OnInit {
  updateUserForm: FormGroup;
  isPasswordVisible = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private db: AngularFirestore,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<DilogUserEditComponent>) {
  }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      name: [this.data[0].name, Validators.required],
      ip: [this.data[0].ip, Validators.required],
      password: [this.data[0].password, Validators.required]
    });
  }

  togglePassword(field) {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.isPasswordVisible ? field.type = 'text' : field.type = 'password';
  }

  updateUserData() {
    this.db.collection('users').doc(this.data[0].id).update(this.updateUserForm.value)
      .then(() => {
        console.log('Document successfully updated! ');
        this.dialogRef.close({...this.updateUserForm.value, id: this.data[0].id});
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  }
}
