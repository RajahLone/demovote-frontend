import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable, firstValueFrom } from 'rxjs';

import { Environnement } from '../env';
import { Production, ProductionShort, ProductionFile } from '../interfaces/production';
import { Message } from '../interfaces/divers';

@Injectable({ providedIn: 'root' })

export class ProductionService
{

  private baseURL = Environnement.apiUrl + "production";

  constructor(private httpClient: HttpClient) { }

  getListProduction(filtreType: string, filtreSolo: number): Observable<ProductionShort[]>
  {
    let params = new HttpParams();

    if (filtreType !== null) { params = params.append('type', filtreType); }
    if (filtreSolo == 1) { params = params.append('solo', filtreSolo); }

    return this.httpClient.get<ProductionShort[]>(`${this.baseURL}/list`, { params: params });
  }

  getProductionFile(id: number): Observable<HttpResponse<Blob>>
  {
    let headers = new HttpHeaders();

    headers = headers.append('Accept', 'application/zip');

    return this.httpClient.get(`${this.baseURL}/file/${id}`, { headers: headers, observe: 'response', responseType: 'blob' });
  }

  createProduction(production: Production): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, production); }

  getByIdProduction(id: number): Observable<ProductionShort>{ return this.httpClient.get<ProductionShort>(`${this.baseURL}/form/${id}`); }

  updateProduction(id: number, production: ProductionShort): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, production); }

  getByIdProductionFile(id: number): Observable<ProductionFile>{ return this.httpClient.get<ProductionFile>(`${this.baseURL}/formfile/${id}`); }

  uploadProductionFile(id: number, production: ProductionFile): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/upload/${id}`, production); }

  async uploadChunk(id: number, chunk: any, chunkIndex: number, fileName: string): Promise<Message>
  {
    const formData = new FormData();

    formData.append('chunkData', chunk);
    formData.append('chunkIndex', '' + chunkIndex);
    formData.append('fileName', fileName);

    return await firstValueFrom(this.httpClient.post<Message>(`${this.baseURL}/upload-chunk/${id}`, formData));
  }
  mergeChunks(id: number, fileName: string, chunkIndex: number): Observable<Message>
  {
    const formData = new FormData();

    formData.append('fileName', fileName);
    formData.append('lastChunkIndex', '' + chunkIndex);

    return this.httpClient.post<Message>(`${this.baseURL}/merge-chunks/${id}`, formData);
  }

  deleteProduction(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }

}
