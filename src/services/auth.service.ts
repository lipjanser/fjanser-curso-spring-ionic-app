import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";

@Injectable()
export class AuthService {
    
    constructor(public http: HttpClient, public storage: StorageService) {
        
    }

    authenticate(creds : CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
                              creds,
                              {
                                  observe: 'response',
                                  responseType: 'text'
                              });
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7); // Removendo texto 'Bearer '
        let user: LocalUser = {
            token: tok,
            email: ""
        };

        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }

    forgotPassword() {
        return this.http.get(`${API_CONFIG.baseUrl}/forgot`);
    }

    refreshToken()  {
        return this.http.get(`${API_CONFIG.baseUrl}/refresh_token`);
    }

}