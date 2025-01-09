import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { DescriptionComponent } from './report/description/description.component';
import { AllReportsComponent } from './report/all-reports/all-reports.component';
import { ExternalReportsComponent } from './report/external-reports/external-reports.component';
import { InternalReportsComponent } from './report/internal-reports/internal-reports.component';
import { FavouriteReportsComponent } from './report/favourite-reports/favourite-reports.component';
import { RetailReportComponent } from './competitive/retail-report/retail-report.component';
import { HomeComponent } from './container/home/home.component';
import { ShoppingMallsReportComponent } from './competitive/shopping-malls-report/shopping-malls-report.component';
import { GdpComponent } from './market/gdp/gdp.component';
import { HospitalityComponent } from './market/hospitality/hospitality.component';
import { PriceComponent } from './market/price/price.component';
import { SocialComponent } from './market/social/social.component';
import { TradeMoneyComponent } from './market/trade-money/trade-money.component';
import { OthersComponent } from './market/others/others.component';
import { CityComponent } from './market/city/city.component';
import { AllnewsComponent } from './news/allnews/allnews.component';
import { DetailsComponent } from './news/details/details.component';
import { FavouriteNewsComponent } from './news/favourite-news/favourite-news.component';
import { ExchangeRatesComponent } from './market/exchangerates/exchangerates.component';
import { ConsumerSpendingComponent } from './market/consumerspending/consumerspending.component';
import { CinemasComponent } from './competitive/cinemas/cinemas.component';
import { LifestyleComponent } from './competitive/lifestyle/lifestyle.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent ,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent ,
    pathMatch: 'full',
  },
  {
    path: 'reports',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'all', component: AllReportsComponent},
      { path: 'external', component: ExternalReportsComponent },
      { path: 'internal', component: InternalReportsComponent },
      { path: 'favorites', component: FavouriteReportsComponent },
      { path: 'detail-page', component: DescriptionComponent }
    ],
  },
  {
    path: 'competitive',
    component: DefaultLayoutComponent,
    children: [
      {path: '', component: RetailReportComponent},
      {path: 'retail', component: RetailReportComponent},
      {path: 'smbu', component: ShoppingMallsReportComponent},
      {path: 'cinemas', component: CinemasComponent},
      {path: 'lifestyle', component: LifestyleComponent}
    ]
  },
  {
    path: 'markets',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: GdpComponent},
      { path: 'gdp' , component: GdpComponent},
      { path: 'hospitality', component: HospitalityComponent},
      { path: 'price', component: PriceComponent },
      { path: 'social', component: SocialComponent },
      { path: 'trade', component: TradeMoneyComponent},
      { path: 'city', component: CityComponent},
      { path: 'exchangerates', component: ExchangeRatesComponent},
      { path: 'consumerspending', component: ConsumerSpendingComponent},
      { path: 'others', component: OthersComponent}
    ]
  },
  {
    path: 'news',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: AllnewsComponent},
      { path: 'allnews' , component: AllnewsComponent},
      { path: 'details' , component: DetailsComponent},
      { path: 'favourites', component: FavouriteNewsComponent },
    ]
  },
  {
    path: 'sector',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      // { path: 'all', component: AllReportsComponent},
      // { path: 'external', component: ExternalReportsComponent },
      // { path: 'internal', component: InternalReportsComponent },
      // { path: 'favorites', component: FavouriteReportsComponent },
      // { path: 'detail-page', component: DescriptionComponent }
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
