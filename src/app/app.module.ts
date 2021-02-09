import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageDialogComponent } from './components/dialogs/language-dialog/language-dialog.component';
import { ShopComponent } from './components/shop/shop.component';
import { HistoryComponent } from './components/history/history.component';
import { ContactComponent } from './components/contact/contact.component';
import { TermsComponent } from './components/terms/terms.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LanguageDialogComponent,
    ShopComponent,
    HistoryComponent,
    ContactComponent,
    TermsComponent
  ],
  entryComponents: [
    LanguageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    NgbModule,
    IvyCarouselModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
