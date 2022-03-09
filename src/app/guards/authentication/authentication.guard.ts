import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad {
  constructor(private router: Router) { }

  canLoad(): boolean {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      alert('Anda belum melakukan login');
      this.router.navigateByUrl('/login', { replaceUrl: true });

      return false;
    }

    return true;
  }
}
