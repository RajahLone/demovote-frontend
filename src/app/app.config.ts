import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, withXsrfConfiguration } from '@angular/common/http';

import { AuthInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig =
{
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withXsrfConfiguration({ cookieName: "XSRF-TOKEN", headerName: "X-XSRF-TOKEN" })),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
