import { Component, inject, input, output } from '@angular/core';
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

  shopHeading = input<string>('Silph Co. Authorized PokéMart');
  cartStatusChange = output<string>();

  readonly inventory = this.pokemonService.inventory;
  readonly cart = this.pokemonService.cart;
  readonly cartTotal = this.pokemonService.cartTotal;

  buyItem(item: MartItem): void {
    this.pokemonService.addToCart(item);
    this.cartStatusChange.emit(`📥 Added 1x ${item.name} to the Bag!`);
  }

  removeItem(itemId: number): void {
    this.pokemonService.removeFromCart(itemId);
    this.cartStatusChange.emit(`📤 Modified item quantity within Bag.`);
  }

  checkout(): void {
    const finalBill = this.cartTotal();
    alert(`🎉 Transaction Complete!\nYour receipt totals: ₽${finalBill}\nThank you for shopping at the PokéMart!`);
    this.pokemonService.clearCart();
    this.cartStatusChange.emit('✨ Registered checkout complete! Bag is cleared.');
  }
}
