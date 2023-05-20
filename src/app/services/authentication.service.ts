import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Storage } from '@ionic/storage'
import { UsersService } from './user.service';
import { AppStorageService } from './app-storage.service';

const TOKEN_KEY = 'my-token';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService  {

	private _storage: Storage | null = null;
	// Init with null to filter out the first value in a guard!
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	token!: string | null ;
	//token = '';

	constructor(
		private http: HttpClient,  
		private storage: Storage, 
		private usersService: UsersService,
		private appStorageService: AppStorageService
		) {
		this.loadToken();
		this.init()
		//Plugins['Preferences']['init']();
	}

	async init(){
        const storage = await this.storage.create();
        this._storage = storage;
    }

	async loadToken() {
		try {
			const token = await Preferences.get({ key: TOKEN_KEY });
			if (token !== undefined && token.value !== undefined && token !== null && token.value !== null ) {
				console.log('set token: ', token.value);
				this.token = token.value;
				this.isAuthenticated.next(true);
			} else {
				this.isAuthenticated.next(false);
			}
		} catch (err) {
			console.error('Erro ao carregar token:', err);
			this.isAuthenticated.next(false);
		}
	}
	

	login(credentials: { email: any; password: any }): Observable<any> {
		return this.http.post(`http://localhost:3000/auth/login`, credentials).pipe(
			map((data: any) => data.token),
			switchMap((token) => {
				return from(Preferences.set({ key: TOKEN_KEY, value: token }));
			}),
			tap((_) => {
				this.isAuthenticated.next(true);
			}),
		
		);
		
	}

	credentials!: any

	async obterUsuarioPeloEMail(){
		const user_email = this.usersService.obterUsuarioPorEmail(this.credentials.email)
		this.appStorageService.set(`user_email`, `${user_email}`)
	}

	logout(): Promise<void> {
		this.isAuthenticated.next(false);
		return Preferences.remove({ key: TOKEN_KEY });
	}
}