import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Album} from '../interfaces/album.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlbumService} from '../services/album.service';
import {MyValidators} from '../validators/MyValidators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @ViewChild("expansionPanel") expansionPanel;

  private _album: Album;
  private _form: FormGroup;
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
    this._form = AlbumComponent._buildForm();
    this._form.patchValue(this._album);
    this._err = '';
  }

  insert() {
    if (this._form.valid) {
      this._service.post(this._form.value).subscribe(
        album => {
          this._created$.emit(album);
        },
        error => this._err = AlbumComponent._handleError(error.status)
      );
    }
  }

  delete() {
    this._service.delete(this._album.id).subscribe(
      () => this._deleted$.emit(this._album.id),
      error => this._err = AlbumComponent._handleError(error.status)
    );
  }

  modify() {
    if (this._form.valid) {
      this._service.put(this._album.id, this._form.value).subscribe(
        album => {
          this._album = album;
          this._form.patchValue(this._album);
          this._modified$.emit(album);
        },
        error => this._err = AlbumComponent._handleError(error.status)
      );
    }
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

  get form(): FormGroup {
    return this._form;
  }

  private static _buildForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.maxLength(255)
        ])
      ),
      editor: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.maxLength(255)
        ])),
      author: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.maxLength(255)
        ])),
      price: new FormControl('',
        Validators.compose([
          Validators.required,
        ])),
      nbEx: new FormControl('',
        Validators.compose([
          Validators.required,
          MyValidators.isNumber
        ])),
    });
  }

  private static _handleError(error: number): string {
    switch (error) {
      case 404:
        return "NOT FOUND";
      default:
        return "SERVER ERROR";
    }
  }
}
