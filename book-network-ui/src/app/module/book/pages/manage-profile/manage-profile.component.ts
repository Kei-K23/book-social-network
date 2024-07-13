import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserRequest} from "../../../../services/models/user-request";
import {UsersService} from "../../../../services/services/users.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {LocalStorageService} from "../../../../services/localStorage/local-storage.service";
import {KEYS} from "../../../../constants/keys";

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.css'
})
export class ManageProfileComponent implements OnInit{
  userRequest: UserRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: ""
  };
  confirmPassword: string = "";
  selectedCoverImg: any;
  selectedImage: string | undefined;

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.getAuthUserData();
  }

  getAuthUserData() {
    this.usersService.getLoginUser().subscribe({
      next: value => {
        this.userRequest.id = value.id;
        this.userRequest.firstName = value.firstName!;
        this.userRequest.lastName = value.lastName!;
        this.userRequest.bio = value.bio!;
        this.userRequest.email = value.email!;

        if (value.profilePicture) {
          this.selectedImage = "data:image/jpg;base64, " + value.profilePicture;
          this.userRequest.profilePicture = value.profilePicture;
        }
      },
      error: err => this.toastr.error(err.error.error)
    });
  }

  onFileSelected($event: any) {
    this.selectedCoverImg = $event.target.files[0];
    if (this.selectedCoverImg) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(this.selectedCoverImg);
    }
  }

  onSave() {
    this.usersService.updateLoginUser(
      {
        body: this.userRequest
      }
    ).subscribe({
      next: value => {
        // If response have token value, then update the existing token
        if (value.updatedJWT) {
          // Remove existing old JWT token
          this.localStorageService.removeLocalStorage(KEYS.JWT_KEY);
          // Save the JWT token in local storage
          this.localStorageService.setLocalStorage(KEYS.JWT_KEY, value.updatedJWT as string);
        }
        this.toastr.success("Successfully updated the profile");
        // Navigate back to profile page
        this.router.navigate(["/books/profile/me"]);
      },
      error: err => this.toastr.error(err.error.error)
    })
  }

  onCancel() {
    // Clear the state
    this.userRequest = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bio: ""
    };
    this.selectedImage = "";
    this.confirmPassword = "";
    this.selectedCoverImg = undefined;
    this.router.navigate(['/books/profile/me']);
  }
}
