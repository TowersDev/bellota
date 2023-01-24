import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { SupabaseService } from 'src/app/services/supabase.service';
import { validateEmail } from 'src/app/utils/validations.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  ionicForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.ionicForm = this.fb.group({
      email: [''],
    });
  }

  ngOnInit() {}

  submitForm() {
    if (isEmpty(this.ionicForm.value.email)) {
      console.log('Todos los campos son obligatorios');
    } else if (!validateEmail(this.ionicForm.value.email)) {
      console.log('El email no es correcto');
    } else {
      this.supabaseService
        .passwordReset(this.ionicForm.value.email)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }
}
