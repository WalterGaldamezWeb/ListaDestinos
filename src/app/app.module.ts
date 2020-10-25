import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './componentes/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './componentes/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './componentes/destino-detalle/destino-detalle.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { FormDestinoViajeComponent } from './componentes/form-destino-viaje/form-destino-viaje.component';
import {
          DestinosViajesState,
          intializeDestinosViajesState,
          reducerDestinosViajes,
          DestinosViajesEffects
        } from './models/destinos-viajes-state.model';
import { LoginComponent } from './componentes/login/login/login.component';
import { ProtectedComponent } from './componentes/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { VuelosComponent } from './componentes/vuelos/vuelos/vuelos.component';
import { VuelosMainComponent } from './componentes/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMasInfoComponent } from './componentes/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { VuelosDetalleComponent } from './componentes/vuelos/vuelos-detalle/vuelos-detalle.component';

// init routing
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponent },
  { path: 'mas-info', component: VuelosMasInfoComponent },
  { path: ':id', component: VuelosDetalleComponent },
];

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ListaDestinosComponent },
    { path: 'destino/:id', component: DestinoDetalleComponent },
    { path: 'login', component: LoginComponent },
    {
      path: 'protected',
      component: ProtectedComponent,
      canActivate: [ UsuarioLogueadoGuard ]
    },
    {
      path: 'vuelos',
      component: VuelosComponent,
      canActivate: [ UsuarioLogueadoGuard ],
      children: childrenRoutesVuelos
    }
  ];

// redux init
export interface AppState {
  destinos: DestinosViajesState;
};

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
    destinos: intializeDestinosViajesState()
};
// fin redux init

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponent,
    VuelosMainComponent,
    VuelosMasInfoComponent,
    VuelosDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
