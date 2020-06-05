import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs/Rx";
import { CredenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService {
    
    constructor(public http: HttpClient){
        
    }

    authenticate(creds : CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
                              creds,
                              {
                                  observe: 'response',
                                  responseType: 'text'
                              });
    }

    forgotPassword() {
        return this.http.get(`${API_CONFIG.baseUrl}/forgot`);
    }

    refreshToken()  {
        return this.http.get(`${API_CONFIG.baseUrl}/refresh_token`);
    }

}