import { AuthorizeService } from './../../api-authorization/authorize.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  isAuthenticated = false;
  isAdmin = false;

  constructor(private authService: AuthorizeService) {
    this.authService.isAuthenticated().subscribe((val)=>{this.isAuthenticated = val});
    this.authService.isAuthenticatedAdminUser().subscribe((val)=>{this.isAdmin = val});
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
