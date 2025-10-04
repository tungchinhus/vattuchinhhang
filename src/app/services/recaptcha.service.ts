import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  errorCodes?: string[];
}

@Injectable({ providedIn: 'root' })
export class RecaptchaService {
  private verifyEndpoint = '/api/recaptcha/verify';

  constructor(private http: HttpClient) {}

  verifyToken(token: string, action: string): Observable<boolean> {
    return this.http
      .post<RecaptchaVerifyResponse>(this.verifyEndpoint, { token, action })
      .pipe(
        map((res) => !!res && res.success === true),
        catchError(() => of(false))
      );
  }
}


