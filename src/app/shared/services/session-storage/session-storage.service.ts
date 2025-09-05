import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public isExist(key: string): boolean{
    return sessionStorage.getItem(key) != null;
  }

  public check(key: string, value?: any): boolean{
    return value === sessionStorage.getItem(key);
  }

  public set(key: string, value: any): void{
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any{
    return JSON.parse((<any>sessionStorage).getItem(key));
  }

  public remove(key: string): void{
    sessionStorage.removeItem(key);
  }

  public clear(): void{
    sessionStorage.clear();
  }

  public getSessionStorage(): Storage{
    return sessionStorage;
  }
}
