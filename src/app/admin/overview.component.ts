﻿import { Component } from '@angular/core';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'overview.component.html' })
export class OverviewComponent {
    constructor(public accountService: AccountService) { }
}