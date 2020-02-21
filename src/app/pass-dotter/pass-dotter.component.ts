import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-pass-dotter',
    templateUrl: './pass-dotter.component.html',
    styleUrls: ['./pass-dotter.component.css']
})
export class PassDotterComponent implements OnInit {
    @Input() password: string;
    dottedPassword: string;

    constructor() {}

    onDotPassword(password: string) {
        return password.length <= 10
            ? password
                  .split('')
                  .map(() => ' • ')
                  .join('')
            : password
                  .slice(0, 10)
                  .split('')
                  .map(() => ' • ')
                  .join('');
    }

    ngOnInit(): void {
        this.dottedPassword = this.onDotPassword(this.password);
    }
}
