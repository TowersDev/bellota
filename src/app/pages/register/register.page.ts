import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isEmpty } from 'lodash';
import { SupabaseService } from 'src/app/services/supabase.service';
import { validateEmail } from '../../utils/validations.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ionicForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.ionicForm = this.formBuilder.group({
      email: [''],
      password: [''],
      repeatPassword: [''],
    });
  }

  ngOnInit() {}

  submitForm() {
    if (
      isEmpty(this.ionicForm.value.email) ||
      isEmpty(this.ionicForm.value.password) ||
      isEmpty(this.ionicForm.value.repeatPassword)
    ) {
      console.log('Todos los campos son obligatorios');
    } else if (!validateEmail(this.ionicForm.value.email)) {
      console.log('El email no es correcto');
    } else if (
      this.ionicForm.value.password !== this.ionicForm.value.repeatPassword
    ) {
      console.log('las contraseñas no coinciden');
    } else {
      const credentials = {
        email: this.ionicForm.value.email,
        password: this.ionicForm.value.password,
      };
      this.supabaseService
        .signUp(credentials)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      // this.authService
      //   .registerUser(this.ionicForm.value.email, this.ionicForm.value.password)
      //   .then((res) => {
      //     const profile = {
      //       displayName: this.ionicForm.value.nombre,
      //       // photoURL: this.avatar,
      //     };
      //     this.authService.updateName(profile);
      //     this.afs.doc(`users/${res.user.uid}`).set({
      //       uid: res.user.uid,
      //       email: this.ionicForm.value.email,
      //       avatar: '',
      //       nombre: this.ionicForm.value.nombre,
      //     });
      //     this.spinnerService.endLoading();
      //     this.router.navigate(['tabs/home']);
      //   })
      //   .catch((error) => {
      //     this.spinnerService.endLoading();
      //     this.messageService.show('El email ya está en uso.');
      //   });
    }
  }
}
