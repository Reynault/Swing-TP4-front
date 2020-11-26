import {Component, OnInit, ViewChild, ViewRef} from '@angular/core';
import {Album} from '../share/interfaces/album.interface';

@Component({
  selector: 'app-manage-albums',
  templateUrl: './manage-albums.component.html',
  styleUrls: ['./manage-albums.component.css']
})
export class ManageAlbumsComponent implements OnInit {
  @ViewChild("search") search;
  @ViewChild("insert") insert;
  @ViewChild("matTabGroup") matTab;

  constructor() {}

  ngOnInit(): void {
  }

  onCreate(album: Album){
    this.search.addNewAlbum(album);
    this.matTab.selectedIndex = 0;
  }

}
