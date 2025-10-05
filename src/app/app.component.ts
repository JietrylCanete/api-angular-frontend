﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './_services';
import { Account, Role } from './_models';

@Component({ 
    selector: 'app-root', 
    templateUrl: 'app.component.html' 
})
export class AppComponent {
    Role = Role;
    account?: Account | null;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {
        // This will now automatically get the account from localStorage
        this.accountService.account.subscribe(x => this.account = x);
    }

    logout() {
        this.accountService.logout();
        this.router.navigate(['/account/login']);
    }
}