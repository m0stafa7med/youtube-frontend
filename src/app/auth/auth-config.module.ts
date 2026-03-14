import {NgModule} from '@angular/core';
import {AuthModule} from 'angular-auth-oidc-client';
import {environment} from '../../environments/environment';

const apiBase = environment.apiUrl.replace('/api', '/');

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://mostafa-youtube-clone.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'Qiv390FI000Ufojn44RHF9WCSBuBpu3i',
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes: [apiBase],
            customParamsAuthRequest: {
                audience: apiBase
            }
        }
    })],
    providers: [],
    exports: [AuthModule],
})
export class AuthConfigModule {
}
