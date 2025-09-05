import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

export interface AuthState {
  permissions: string[];
}

export function createInitialState(): AuthState {
  return {permissions: []};
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  constructor(private permissionsService: NgxPermissionsService) {
    this.permissionsService.loadPermissions(createInitialState().permissions);
  }

  setState(permissions: string[]): void {
    this.permissionsService.loadPermissions(permissions);
  }

  getState(): any {
    return this.permissionsService.getPermissions();
  }
}
