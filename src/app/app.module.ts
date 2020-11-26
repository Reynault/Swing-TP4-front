import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AlbumCardComponent} from './share/album-card/album-card.component';
import {AlbumListComponent} from './share/album-list/album-list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ManageAlbumsComponent} from './manage-albums/manage-albums.component';
import {NavbarComponent} from './share/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MoneyPipe} from './share/pipe/money.pipe';
import { AlbumComponent } from './share/album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumCardComponent,
    AlbumListComponent,
    NotFoundComponent,
    ManageAlbumsComponent,
    NavbarComponent,
    MoneyPipe,
    AlbumComponent,
  ],
    imports: [
        BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatTabsModule, FormsModule, ReactiveFormsModule, MatExpansionModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
