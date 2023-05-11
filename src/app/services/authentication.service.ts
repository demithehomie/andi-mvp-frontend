import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
}

// ionic g guard guards/auth --implements CanLoad && ionic g guard guards/intro --implements CanLoad && ionic g guard guards/autoLogin --implements CanLoad
