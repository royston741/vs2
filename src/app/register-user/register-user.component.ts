import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  @Input()
  formFor = "CUSTOMER";

  formFirstName = { value: '', valid: false }
  formLastName = { value: '', valid: false }
  formEmail = { value: '', valid: false }
  formPhoneNo = { value: '', valid: false }
  formPassword = { value: '', valid: false }
  formAddress = { value: '', valid: true }

  responseSuccess = false;
  responseErrorMessage = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.formFor === "ADMIN") {
      this.formAddress.value = "Office address";
    }
  }

  onNavigate() {
    this.router.navigate(['login'])
  }

  onSubmitForm(e: Event) {
    this.responseSuccess = false;
    this.responseErrorMessage = [];
    e.preventDefault();
    this.userService.addCustomer({
      firstName: this.formFirstName.value.trim(),
      lastName: this.formLastName.value.trim(),
      email: this.formEmail.value.trim(),
      phoneNo: this.formPhoneNo.value.trim(),
      password: this.formPassword.value.trim(),
      address: this.formAddress.value.trim(),
      userType: this.formFor
    }).subscribe({
      next: (response) => {
        this.responseSuccess = response.success
        if (this.responseSuccess) {
          setTimeout(() => {
            this.resetForm()
          }, 1000)
        }
      }, error: (err) => {
        this.responseErrorMessage = err.error.errMssg
      }
    })
  }

  validateName(value: string) {
    return value.trim().length > 3;
  }

  validatePhoneNo(value: number) {
    let num = value + "";
    return (num.trim().length >= 10 && num.trim().length <= 10);
  }

  validateEmail(value: string) {
    return value.trim().includes("@");
  }

  validatePassword(value: string) {
    return value.trim().length > 8;
  }

  validateAddress(value: string) {
    this.formAddress.valid = value.length > 8;
  }

  resetForm() {
    this.formFirstName = { value: '', valid: false }
    this.formLastName = { value: '', valid: false }
    this.formEmail = { value: '', valid: false }
    this.formPhoneNo = { value: '', valid: false }
    this.formPassword = { value: '', valid: false }
    this.formAddress = { value: '', valid: true }
  }
}
