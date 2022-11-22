import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;                    // {1}
  private formSubmitAttempt!: boolean; // {2}
  loginMessage='';

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService // {4}
  ) {}

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
     );
  }

  onSubmit() {
    if (this.form.valid) {
      if(this.authService.login(this.form.value)==2){
        this.formSubmitAttempt = true;
      }
      else if(this.authService.login(this.form.value)==1){
          this.loginMessage="Username/Password invalid";
      }

    }

  };
}
