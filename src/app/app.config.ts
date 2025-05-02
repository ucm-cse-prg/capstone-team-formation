import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { tap, of, catchError } from 'rxjs';
import { ConfigService } from '@services/config.service';
import { environment } from '@environments/environment';
import { httpErrorInterceptor } from '@core/http-error.interceptor';
import { routes } from './app.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAppInitializer(() => {
            const settingsService = inject(ConfigService);
            const httpClient = inject(HttpClient);
            if (environment.production) {
                httpClient.get<{ API_URL: string }>('./config.json').pipe(
                    tap(settings => {
                        settingsService.apiUrl = settings.API_URL;
                        return of(true);
                    }),
                    catchError(() => {
                        settingsService.apiUrl = 'http://localhost:8000';
                        return of(false);
                    })
                ).subscribe();
            } else {
                settingsService.apiUrl = environment.apiUrl;
            }
        }),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: httpErrorInterceptor,
            multi: true
        },
        provideAnimationsAsync(),
        MatSnackBarModule,
    ]
};

