import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user-service/user.service';
import { CustomValidatorsService } from '../services/user-service/custom-validators.service';

@Component({
    selector: 'app-dilog-user-edit',
    templateUrl: './dilog-user-edit.component.html',
    styleUrls: ['./dilog-user-edit.component.css']
})
export class DilogUserEditComponent implements OnInit {
    updateUserForm: FormGroup;
    isPasswordVisible = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DilogUserEditComponent>,
        private userService: UserService,
        public customValidators: CustomValidatorsService
    ) {}

    ngOnInit(): void {
        const {
            validateIP,
            validatePwdUppercase,
            validatePwdLowercase,
            validatePwdNumeric,
            validatePwdSpecial,
            validatePwdMinLength
        } = this.customValidators;

        this.updateUserForm = this.fb.group({
            name: [this.data[0].name, Validators.required],
            ip: [this.data[0].ip, validateIP],
            password: [
                this.data[0].password,
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

    togglePassword(field) {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.isPasswordVisible ? (field.type = 'text') : (field.type = 'password');
    }

    updateUserData() {
        this.userService
            .updateUserData(this.data[0].id, this.updateUserForm.value)
            .then(() => {
                this.dialogRef.close({
                    ...this.updateUserForm.value,
                    id: this.data[0].id
                });
            })
            .catch(error => {
                console.error('Error updating document: ', error);
            });
    }
}
