import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DilogUserEditComponent} from './dilog-user-edit/dilog-user-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-firebase-test';
  receiveData: any = [];
  createUserForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'ip', 'password', 'delete'];
  dataSource = this.receiveData;
  isPasswordVisible = false;

  constructor(private db: AngularFirestore,
              private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  getUsers() {
    this.db.collection('users').get().subscribe((querySnapshot) => {
      querySnapshot.forEach((queryDocumentSnapshot) => {
        this.receiveData.push({
          ...queryDocumentSnapshot.data(),
          id: queryDocumentSnapshot.id
        });
      });
    });
  }

  addUserForm() {
    this.createUserForm = this.fb.group({
      name: ['', Validators.required],
      ip: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  addUser() {
    this.db.collection('users').add(this.createUserForm.value)
      .then((docRef) =>
        this.receiveData.push({
          ...this.createUserForm.value,
          id: docRef.id
        }))
      .then(() => this.dataSource = new MatTableDataSource<Element>(this.receiveData))
      .catch((error) => console.error('Error adding document: ', error));
  }

  deleteUser(id: string) {
    this.db.collection('users').doc(id).delete()
      .then(() => this.receiveData = this.receiveData.filter(item => item.id !== id))
      .then(() => this.dataSource = new MatTableDataSource<Element>(this.receiveData))
      .catch((error) => console.error('Error removing document: ', error));
  }

  openDialogUserUpdate(id: string): void {
    this.dialog.open(DilogUserEditComponent, {
      data: this.dataSource.filter((data) => data.id === id)
    });
  }

  togglePassword(field) {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.isPasswordVisible ? field.type = 'text' : field.type = 'password';
  }

  ngOnInit(): void {
    this.getUsers();
    this.addUserForm();
  }
}
