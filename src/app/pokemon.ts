import { Injectable, signal, computed } from '@angular/core';

export interface Pokemon {
  name: string;
  type: string;
  heldItem: string;
  description: string;
}

export interface RegionData {
  region: string;
  pokemon: Pokemon[];
}

export interface MartItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface CartItem {
  product: MartItem;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly regionalPokemon: RegionData[] = [
    {
      region: 'Kanto',
      pokemon: [
        { name: 'Charizard', type: 'Fire / Flying', heldItem: 'Charizardite', description: 'Flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything.' },
        { name: 'Gengar', type: 'Ghost / Poison', heldItem: 'Life Orb', description: 'Hides in shadows. It is said that if Gengar is hiding in a room, the temperature drops by nearly 10 degrees.' }
      ]
    },
    {
      region: 'Johto',
      pokemon: [
        { name: 'Tyranitar', type: 'Rock / Dark', heldItem: 'Assault Vest', description: 'Its body cannot be harmed by any sort of attack, so it is very eager to make challenges against enemies.' },
        { name: 'Ampharos', type: 'Electric', heldItem: 'Light Clay', description: 'The bright light on its tail can be seen from far away. It has been treasured since ancient times as a beacon.' }
      ]
    },
    {
      region: 'Hoenn',
      pokemon: [
        { name: 'Blaziken', type: 'Fire / Fighting', heldItem: 'Choice Band', description: 'When facing a tough foe, it looses flames from its wrists. Its powerful legs let it jump clear over buildings.' },
        { name: 'Gardevoir', type: 'Psychic / Fairy', heldItem: 'Leftovers', description: 'It has the power to predict the future. It flashes its life to protect its Trainer.' }
      ]
    }
  ];

  private readonly martInventory: MartItem[] = [
    { id: 1, name: 'Poke Ball', price: 200, description: 'A device for catching wild Pokémon.' },
    { id: 2, name: 'Great Ball', price: 600, description: 'A high-performance Ball that provides a higher catch rate.' },
    { id: 3, name: 'Ultra Ball', price: 1200, description: 'An ultra-performance Ball that provides an even higher catch rate.' },
    { id: 4, name: 'Potion', price: 300, description: 'Restores 20 HP to a single wounded Pokémon.' },
    { id: 5, name: 'Super Potion', price: 700, description: 'Restores 60 HP to a single wounded Pokémon.' },
    { id: 6, name: 'Hyper Potion', price: 1500, description: 'Restores 120 HP to a single wounded Pokémon.' },
    { id: 7, name: 'Max Potion', price: 2500, description: 'Fully restores the HP of a single wounded Pokémon.' },
    { id: 8, name: 'Full Heal', price: 600, description: 'Heals all status conditions of a single Pokémon.' },
    { id: 9, name: 'Revive', price: 1500, description: 'Revives a fainted Pokémon and restores half its max HP.' },
    { id: 10, name: 'Max Elixir', price: 4500, description: 'Fully restores the PP of all moves known by the Pokémon.' }
  ];

  private readonly cartSignal = signal<CartItem[]>([]);

  readonly pokemon = signal<RegionData[]>(this.regionalPokemon).asReadonly();
  readonly inventory = signal<MartItem[]>(this.martInventory).asReadonly();
  readonly cart = this.cartSignal.asReadonly();
  readonly cartTotal = computed(() => {
    return this.cartSignal().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  addToCart(item: MartItem): void {
    this.cartSignal.update((currentCart) => {
      const existingIndex = currentCart.findIndex((cartItem) => cartItem.product.id === item.id);
      if (existingIndex > -1) {
        const updatedCart = [...currentCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1
        };
        return updatedCart;
      }
      return [...currentCart, { product: item, quantity: 1 }];
    });
  }

  removeFromCart(itemId: number): void {
    this.cartSignal.update((currentCart) => {
      const existingIndex = currentCart.findIndex((cartItem) => cartItem.product.id === itemId);
      if (existingIndex > -1) {
        const updatedCart = [...currentCart];
        if (updatedCart[existingIndex].quantity > 1) {
          updatedCart[existingIndex] = {
            ...updatedCart[existingIndex],
            quantity: updatedCart[existingIndex].quantity - 1
          };
          return updatedCart;
        }
        return updatedCart.filter((cartItem) => cartItem.product.id !== itemId);
      }
      return currentCart;
    });
  }

  clearCart(): void {
    this.cartSignal.set([]);
  }
}
