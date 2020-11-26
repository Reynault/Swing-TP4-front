import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../interfaces/album.interface';
import {Router} from '@angular/router';
import {AlbumService} from '../services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  private _albums: Album[];

  constructor(private _router: Router, private _serv: AlbumService) {
    this._albums = [];
  }

  ngOnInit(): void {
    this._serv.get().subscribe(
      data => {
        this._albums = data;
      },
      error => {
        this._router.navigate(['/404']);
      }
    );
  }

  delete(albumId: string){
    this._albums = this._albums.filter(album => album.id != albumId);
  }

  get albums(): Album[] {
    return this._albums;
  }

  addNewAlbum(value: Album) {
    this._albums.push(value);
  }

  modify(album: Album) {
    this._albums.map(
      _ => _.id === album.id ? album : _
    );
  }
}
