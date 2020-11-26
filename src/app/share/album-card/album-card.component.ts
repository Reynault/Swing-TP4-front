import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Album} from '../interfaces/album.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlbumService} from '../services/album.service';
import {MyValidators} from '../validators/MyValidators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent implements OnInit {

  @ViewChild("expansionPanel") expansionPanel;

  private _album: Album;
  private _toCreate: boolean;
  private _err: string;

  private readonly _deleted$: EventEmitter<string>;
  private readonly _created$: EventEmitter<Album>;
  private readonly _modified$: EventEmitter<Album>;

  constructor(private _service: AlbumService,
              private _router: Router) {
    this._album = this._service.defaultAlbum;
    this._deleted$ = new EventEmitter<string>();
    this._created$ = new EventEmitter<Album>();
    this._modified$ = new EventEmitter<Album>();
    this._toCreate = false;
  }

  ngOnInit(): void {
    this._err = '';
  }

  @Output()
  get deleted(): EventEmitter<string> {
    return this._deleted$;
  }

  @Output()
  get modified(): EventEmitter<Album> {
    return this._modified$;
  }

  @Output()
  get created(): EventEmitter<Album> {
    return this._created$;
  }

  get err(): string {
    return this._err;
  }

  @Input()
  set toCreate(value: boolean) {
    this._toCreate = value;
  }

  get toCreate(): boolean {
    return this._toCreate;
  }

  get album(): Album {
    return this._album;
  }

  @Input()
  set album(value: Album) {
    this._album = value;
  }

  modify(a: Album) {
    this._album = a;
    this.expansionPanel.expanded = false;
    this._modified$.emit(a);
  }

  delete(a: string) {
    this._deleted$.emit(a);
  }
}
