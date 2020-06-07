import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { EXTERNAL_API_CONFIG } from '../config/externalapi.config';


@Injectable()
export class CepService {

  address: any = {
                    cep: "",
                    logradouro: "",
                    complemento: "",
                    bairro: "",
                    localidade: "",
                    uf: "",
                    unidade: "",
                    ibge: ""
                };

  constructor(public http: HttpClient) {

  }

  getCepAddress(cep: string) : Observable<any> {
    let url = `${EXTERNAL_API_CONFIG.cepUrl}${cep}/json/`;
    return this.http.get(url);
  }

}