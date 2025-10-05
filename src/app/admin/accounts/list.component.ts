﻿import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Component({ 
    templateUrl: 'list.component.html', 
    styleUrls: ['./list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
    accounts?: any[];
    Role = Role;

    constructor(
        private accountService: AccountService,
        public accountServicePublic: AccountService
    ) { }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts);
    }

    deleteAccount(id: string) {
        const account = this.accounts!.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts!.filter(x => x.id !== id)
            });
    }
}