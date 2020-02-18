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
      .then((docRef) => {
        this.receiveData.push({...this.createUserForm.value, id: docRef.id});
        this.dataSource = new MatTableDataSource<Element>(this.receiveData);
      })
      .catch((error) => console.error('Error adding document: ', error));
  }

  deleteUser(id: string) {
    this.db.collection('users').doc(id).delete()
      .then(() => {
        this.receiveData = this.receiveData.filter(item => item.id !== id);
        this.dataSource = new MatTableDataSource<Element>(this.receiveData);
      })
      .catch((error) => console.error('Error removing document: ', error));
  }

  openDialogUserUpdate(id: string): void {
    const dialogRef = this.dialog.open(DilogUserEditComponent, {
      data: this.receiveData.filter((data) => data.id === id)
    });

    dialogRef.afterClosed().subscribe(
      (resp) => {
        const idx = this.receiveData.findIndex((item) => item.id === resp.id);
        this.receiveData[idx] = resp;
      },
      (err) => {
        console.error('Observer got an error: ' + err);
      },
      () => {
        this.dataSource = new MatTableDataSource<Element>(this.receiveData);
      }
    );
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
