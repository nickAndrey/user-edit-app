import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DilogUserEditComponent } from '../dilog-user-edit/dilog-user-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user-service/user.service';
import { CustomValidatorsService } from '../services/user-service/custom-validators.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    receiveData: any = [];
    createUserForm: FormGroup;
    displayedColumns: string[] = ['id', 'name', 'ip', 'password', 'actions'];
    dataSource = this.receiveData;
    isPasswordVisible = false;

    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private userService: UserService,
        public customValidators: CustomValidatorsService
    ) {}

    addUserForm() {
        const {
            validateIP,
            validatePwdUppercase,
            validatePwdLowercase,
            validatePwdNumeric,
            validatePwdSpecial,
            validatePwdMinLength
        } = this.customValidators;
        this.createUserForm = this.fb.group({
            name: [''],
            ip: ['', validateIP],
            password: [
                '',
                Validators.compose([
                    validatePwdUppercase,
                    validatePwdLowercase,
                    validatePwdNumeric,
                    validatePwdSpecial,
                    validatePwdMinLength
                ])
            ]
        });
    }

    getUsers() {
        this.userService.getUserData().subscribe(querySnapshot => {
            querySnapshot.forEach(queryDocumentSnapshot => {
                this.receiveData.push({
                    ...queryDocumentSnapshot.data(),
                    id: queryDocumentSnapshot.id
                });
            });
        });
    }

    addUser() {
        this.userService
            .addUser(this.createUserForm.value)
            .then(docRef => {
                this.receiveData.push({
                    ...this.createUserForm.value,
                    id: docRef.id
                });
                this.dataSource = new MatTableDataSource<Element>(this.receiveData);
            })
            .catch(error => console.error('Error adding document: ', error));
    }

    deleteUser(id: string) {
        this.userService
            .removeUserData(id)
            .then(() => {
                this.receiveData = this.receiveData.filter(item => item.id !== id);
                this.dataSource = new MatTableDataSource<Element>(this.receiveData);
            })
            .catch(error => console.error('Error removing document: ', error));
    }

    openDialogUserUpdate(id: string): void {
        const dialogRef = this.dialog.open(DilogUserEditComponent, {
            data: this.receiveData.filter(data => data.id === id)
        });

        dialogRef.afterClosed().subscribe(
            resp => {
                const idx = resp ? this.receiveData.findIndex(item => item.id === resp.id) : null;
                this.receiveData[idx] = resp;
                this.dataSource = new MatTableDataSource<Element>(this.receiveData);
            },
            err => console.error('Observer got an error: ' + err)
        );
    }

    togglePassword(field) {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.isPasswordVisible ? (field.type = 'text') : (field.type = 'password');
    }

    ngOnInit(): void {
        this.getUsers();
        this.addUserForm();
    }
}
