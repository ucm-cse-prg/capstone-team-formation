import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SnackBarService } from '@app/services/snackbar.service';

@Injectable({
    providedIn: 'root'
  })
  export class httpErrorInterceptor implements HttpInterceptor {
  
    constructor(private router: Router, private snackBar: SnackBarService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            tap({
                // next: (event) => { }, 
                error: (error) => {
                    if (error instanceof HttpErrorResponse) {
                        console.log('Error:', error);
                        
                        switch (error.status) {
                            case 404:
                                this.router.navigate(['/not-found'], { state: { error: error.error }, skipLocationChange: true });
                                break;
                            case 422:
                                // console.log('422 error:', error);
                                this.snackBar.openSnackBar(error.error.detail[0].msg, 'Close', 'error');
                                break;
                            default:
                                break;
                        }
                    }
                }
            })
        );
    }
}


