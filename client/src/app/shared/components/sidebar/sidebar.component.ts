import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    currentSession: any;
    currentRole: any;

    constructor(private authService: AuthService) {

    }

    ngOnInit() {
        this.currentSession = this.authService.getUserInfo();
        this.currentRole = this.currentSession.role;
    }

    isActive = false;
    showMenu = '';
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
