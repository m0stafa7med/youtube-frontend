import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-saq1mdhwlx2xddtx.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'MUgArEJ5rwfxKbHbXgjWAFFxAGYbuy5G',
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes:['http://localhost:9099/'],
            customParamsAuthRequest:{
                audience: 'http://localhost:9099',
            }
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
