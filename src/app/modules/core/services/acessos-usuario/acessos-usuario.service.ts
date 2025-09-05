import {Injectable} from '@angular/core';
import {PortalService} from '../portal/portal.service';
import _ from 'underscore';
import {AuthStore} from '../../auth/state/auth.store';
import {ActionID} from '../../models/portal/action-id.model';

@Injectable({
    providedIn: 'root'
})
export class AcessosUsuarioService {

    private actionsUsuarios: ActionID[] | undefined = [];
    private roles: string[] = [];

    constructor(private portalService: PortalService,
                private authStore: AuthStore) {
    }

    getActionsUsuario(): ActionID[] | undefined {
        return this.actionsUsuarios;
    }

    getRoles(): string[] {
        return this.roles;
    }

    hasRole(role: string[] | string): boolean {
        if (!role) {
            return false;
        }
        if (!Array.isArray(role)) {
            return _.contains(this.roles, role);
        } else {
            for (const index in role) {
                if (_.contains(this.roles, role[index])) {
                    return true;
                }
            }
            return false;
        }
    }

    isNotEmptyRoles() {
        return this.roles && this.roles.length > 0;
    }

    async load(): Promise<ActionID[] | undefined> {
        this.actionsUsuarios = await this.portalService.findActionsUsuario().toPromise();
        this.roles = _.pluck((this.actionsUsuarios as any), 'um_attr_value');
        this.authStore.setState(this.roles);
        return this.actionsUsuarios;
    }
}
