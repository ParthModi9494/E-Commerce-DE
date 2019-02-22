import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    public toasterService: ToastrService,
    public router: Router
  ) {

  }

  public isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    return user && user.length > 0 ? true : false;
  }

  public login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((res) => {

        this.toasterService.success('success', 'Logged in successfully!');

        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUser = res.user;
        this.router.navigate(['']);

      }).catch((error) => {

        this.toasterService.error(error.message);
      });
  }

  public signup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((res) => {

      this.toasterService.success('User registered successfully!');
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigate(['']);
    }).catch((error) => {

      this.toasterService.error(error.message);

    });
  }

  public async logout() {
    await localStorage.removeItem('user');
    await localStorage.clear();
    this.router.navigate(['login']);
  }
}
