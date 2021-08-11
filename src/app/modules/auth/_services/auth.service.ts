import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, Subject } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegistrationModel } from '../_models/reg.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  public userStatus;
  private isAuthendicated=false;
  private token : string;
  private userId:any;
  private User:any;
  private tokenTimer:any;
  private authStatusListener= new Subject<boolean>();
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): UserModel {
    console.log("this is the current user subject",this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private http:HttpClient
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    /* const subscr = this.getUserByToken().subscribe(); */
    /* this.unsubscribe.push(subscr); */
  }
  editUser(user){
    console.log("edited user in auth service",user);
   this.http.put("http://localhost:3000/api/user/update",user)
    .subscribe(response=>{
      console.log("response og updated user",response)
    }), (err)=>{
      console.log(err);
    }
  }
  getToken(){
    return this.token;
  }
  getIsAuth(){
    return this.isAuthendicated;
  }
  getuserId(){
    return this.userId;
  }

  getAuthStatusListerner(){
    return this.authStatusListener.asObservable();
  }
  // public methods
  login(email: string, password: string) /* : Observable<UserModel> */ {
    this.isLoadingSubject.next(true);
    console.log("login email",email,"password",password);
    this.authHttpService.login(email,password)
    .subscribe(response=>{
          console.log("login response",response);
          const token=response.token;
          this.token=token;
          if(token){
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthendicated=true;
            this.userId=response.userId;
            console.log('userID in login',response.userId);
            this.authStatusListener.next(true);
            const now=new Date();
            const expirationDate=new Date(now.getTime() + expiresInDuration*1000);
            console.log(expirationDate);
            this.saveAuthData(token,expirationDate,this.userId);
            this.isLoadingSubject.next(true);
            this.currentUserSubject = new BehaviorSubject<UserModel>(this.userId);
            this.router.navigate(['/dashboard']);
            return this.userId;
           }
      })
   /*  return this.authHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        console.log("result",result);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    ); */
  }
  autoAuthUser() {
     const authInformation = this.getAuthData();
     if (!authInformation) {
       return;
     }
     const now = new Date();
     const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
     if (expiresIn > 0) {
       this.token = authInformation.token;
       this.isAuthendicated = true;
       this.userId=authInformation.userId;
       this.setAuthTimer(expiresIn / 1000);
       this.authStatusListener.next(true);
     }
   }

  /* logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  } */

   /*  getUserByToken(): Observable<UserModel> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user: UserModel) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(this.userId);
        } else {
          //this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }   */

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    this.login(user.email, user.password)
    console.log("this is the registration user",user);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      // switchMap(() => this.login(user.email, user.password)),
      // catchError((err) => {
      //   console.error('err', err);
      //   return of(undefined);
      // }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  logout() {
    this.token = null;
    this.isAuthendicated= false;
    this.userId=null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date,userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId",userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId= localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId:userId
    }
  }

 private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }   

     getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  } 

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
