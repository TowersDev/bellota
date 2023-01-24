import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { SupabaseService } from 'src/app/services/supabase.service';
import { validateEmail } from 'src/app/utils/validations.component';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  ionicForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.ionicForm = this.formBuilder.group({
      password: [''],
      repeatPassword: [''],
    });
  }

  ngOnInit() {}

  submitForm() {
    if (
      isEmpty(this.ionicForm.value.password) ||
      isEmpty(this.ionicForm.value.repeatPassword)
    ) {
      console.log('Todos los campos son obligatorios');
    } else if (
      this.ionicForm.value.password !== this.ionicForm.value.repeatPassword
    ) {
      console.log('las contraseñas no coinciden');
    } else {
      this.supabaseService
        .passwordUpdate(this.ionicForm.value.password)
        .then((res) => {
          console.log('contraseña correctamente actualizada.');
          this.router.navigate(['/login']);
        })
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
