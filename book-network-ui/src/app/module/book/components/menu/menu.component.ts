import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LocalStorageService} from "../../../../services/localStorage/local-storage.service";
import {KEYS} from "../../../../constants/keys";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(
    private localStorageService : LocalStorageService,
    private router : Router
  ) {
  }

  onLogout() {
    // Remove logined JWT token
    this.localStorageService.removeLocalStorage(KEYS.JWT_KEY)
    // Navigate to login screen
    this.router.navigate(['login'])
  }
}
