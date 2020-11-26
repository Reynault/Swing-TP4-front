import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Album} from '../interfaces/album.interface';
import {Observable} from 'rxjs';
import {defaultIfEmpty, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private  _backendURL: any;
  private readonly _defaultAlbum: Album;

  constructor(private _http: HttpClient) {
    this._defaultAlbum = {
      title: 'Titre',
      editor: 'Editeur',
      author: 'Auteur',
      price: 0.0,
      nbEx: 1,
    };

    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k =>
      this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);

  }

  get defaultAlbum(): Album {
    return this._defaultAlbum;
  }

  get(): Observable<Album[]> {
    return this._http.get<Album[]>(this._backendURL.getAlbums).pipe(
      map(_ => !!_ ? _ : [])
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(this._backendURL.deleteAlbum.replace(':id', id));
  }

  post(album: Album): Observable<Album> {
    return this._http.post<Album>(
      this._backendURL.postAlbum,
      album
    );
  }

  put(id: string, album: Album): Observable<Album> {
    return this._http.put<Album>(
      this._backendURL.putAlbum.replace(':id', id),
      album
    );
  }
}
