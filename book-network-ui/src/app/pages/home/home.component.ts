import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LocalStorageService} from "../../services/localStorage/local-storage.service";
import {KEYS} from "../../constants/keys";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(
    private router : Router,
    private localStorageService : LocalStorageService
  ) {
  }

  ngOnInit() {
    const jwt = this.localStorageService.getLocalStorage(KEYS.JWT_KEY);
    if (jwt) {
      this.router.navigate(["/books"]);
      return;
    }
  }
}
