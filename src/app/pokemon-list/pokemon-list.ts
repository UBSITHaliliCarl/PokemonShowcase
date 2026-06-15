import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService, Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList {
  private readonly pokemonService = inject(PokemonService);
 
  showcaseHeader = input<string>('My Favorite Regional Pokemons');
  onInspectCard = output<Pokemon>();

  readonly regionalData = this.pokemonService.pokemon;

  inspectPokemon(pokemon: Pokemon): void {
    this.onInspectCard.emit(pokemon);
  }
}
