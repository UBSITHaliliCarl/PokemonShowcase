import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'pokemon', 
    loadComponent: () => import('./pokemon-list/pokemon-list').then(m => m.PokemonList) 
  },
  { 
    path: 'mart', 
    loadComponent: () => import('./pokemart/pokemart').then(m => m.Pokemart) 
  },
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  { path: '**', redirectTo: 'pokemon' }
];
