﻿﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './_services';
import { Account, Role } from './_models';

@Component({ 
    selector: 'app-root', 
    templateUrl: 'app.component.html' 
})
export class AppComponent implements OnInit {
    Role = Role;
    account?: Account | null;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {
        console.log('AppComponent constructor - initializing...');
        
        this.accountService.account.subscribe(x => {
            console.log('Account subscription update:', x);
            this.account = x;
        });
    }

    ngOnInit() {
        console.log('AppComponent ngOnInit started');
        console.log('Current URL:', window.location.href);
        
        // Check authentication state
        const hasStoredSession = localStorage.getItem('currentAccount');
        console.log('Has stored session:', hasStoredSession);
        console.log('Current account value:', this.account);
        
        // If no valid account but we're on a protected route, redirect to login
        if (!this.account && this.isProtectedRoute()) {
            console.log('No valid session and on protected route - redirecting to login');
            localStorage.removeItem('currentAccount'); // Clear any invalid session
            this.router.navigate(['/account/login']);
        } else if (!this.account) {
            console.log('No valid session - allowing access to public routes');
        }
    }

    private isProtectedRoute(): boolean {
        const currentRoute = window.location.pathname;
        console.log('Current route:', currentRoute);
        
        // Define which routes require authentication
        const protectedRoutes = ['/', '/profile', '/admin'];
        const isProtected = protectedRoutes.some(route => 
            currentRoute === route || currentRoute.startsWith(route + '/')
        );
        
        console.log('Is protected route:', isProtected);
        return isProtected;
    }

    logout() {
        console.log('Logging out...');
        this.accountService.logout();
        this.router.navigate(['/account/login']);
    }
}