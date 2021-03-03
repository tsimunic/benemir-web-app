import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { HistoryComponent } from './components/history/history.component';
import { ContactComponent } from './components/contact/contact.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AboutComponent } from './components/about/about.component';
import { pageMetadata } from 'src/assets/page_metadata_hr';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: pageMetadata.home
  },
  {
    path: 'home',
    component: HomeComponent,
    data: pageMetadata.home
  },
  {
    path: 'about',
    component: AboutComponent,
    data: pageMetadata.about
  },
  {
    path: 'shop',
    component: ShopComponent,
    data: pageMetadata.shop
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: pageMetadata.history
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: pageMetadata.contact
  },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
