import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService, MartItem } from '../pokemon';

@Component({
  selector: 'app-pokemart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemart.html',
  styleUrl: './pokemart.css',
})
export class Pokemart {
  private readonly pokemonService = inject(PokemonService);

  readonly inventory = this.pokemonService.inventory;
  readonly cart = this.pokemonService.cart;
  readonly cartTotal = this.pokemonService.cartTotal;

  buyItem(item: MartItem): void {
    this.pokemonService.addToCart(item);
  }

  removeItem(itemId: number): void {
    this.pokemonService.removeFromCart(itemId);
  }

  checkout(): void {
    alert(`Transaction Complete! Total paid: ₽${this.cartTotal()}`);
    this.pokemonService.clearCart();
  }
}
