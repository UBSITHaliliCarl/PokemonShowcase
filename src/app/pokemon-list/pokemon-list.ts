import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList {
  private readonly pokemonService = inject(PokemonService);
  
  readonly regionalData = this.pokemonService.pokemon;
}
