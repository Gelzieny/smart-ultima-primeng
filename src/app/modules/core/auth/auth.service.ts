import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService,
              private http: HttpClient) { }

  getUserToken(){
    return this.oauthService.getAccessToken();
  }

  getCpf() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return (<any>claims)['cpf'];
  }

  getGivenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return (<any>claims)['given_name'];
  }

  getEmail() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return (<any>claims)['email_pessoal'];
  }

  getEmailCorporativo() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return (<any>claims)['email_corporativo'];
  }

  getUsername() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return (<any>claims)['sub'];
  }

  getExp() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return (<any>claims)['exp'];
  }

  isExpiredToken(): boolean {
    let exp = this.getExp();
    let currentTime = new Date().getTime();
    if (exp) {
      let expMilis = (exp * 1000);
      if (expMilis > currentTime) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  isValidToken(): boolean {
    return this.oauthService.hasValidAccessToken() && !this.isExpiredToken();
  }
}
