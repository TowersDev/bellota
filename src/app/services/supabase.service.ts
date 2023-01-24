import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { map } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export class AuthUserId {
  constructor(public uid: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
      // {
      //   autoRefreshToken: true,
      //   persistSession: true,
      // }
    );

    this.supabase.auth.onAuthStateChange((event: any, session: any) => {
      console.log('event: ', event);

      if (event === 'SIGNED_IN') {
        this._currentUser.next(session.user);
      } else {
        this._currentUser.next(false);
      }
    });
  }

  async loadUser() {
    const user = this.supabase.auth.getUser();
    console.log('user: ', user);

    if (user) {
      this._currentUser.next(user);
      user
        .then((res: any) => console.log(res))
        .catch((err: any) => console.log(err));
    } else {
      this._currentUser.next(false);
    }
  }

  async signUp(credentials: { email: any; password: any }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signUp(credentials);
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  async signIn(credentials: { email: any; password: any }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signInWithPassword(
        credentials
      );
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  async passwordReset(email: any) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: 'http://localhost:8100/password',
      }
    );
  }

  async passwordUpdate(new_password: any) {
    const { data, error } = await this.supabase.auth.updateUser({
      password: new_password,
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();

    // this.supabase.getSubscriptions().map((sup: any) => {
    //   this.supabase.removeSubscription(sup);
    // });

    // this.router.navigateByUrl('/');
  }
}
