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
        { name: 'Dragonite', type: 'Dragon / Flying', heldItem: 'Heavy-Duty Boots', description: 'It is said to make its home somewhere in the sea. It guides crews of shipwrecks to safety through rough waters.' },
        { name: 'Arcanine', type: 'Fire', heldItem: 'Choice Band', description: 'An ancient and majestic Pokémon. Its magnificent bark conveys a sense of power, and anyone who hears it can’t help but grovel.' }
      ]
    },
    {
      region: 'Johto',
      pokemon: [
        { name: 'Scizor', type: 'Bug / Steel', heldItem: 'Life Orb', description: 'It intimidates foes by upraising its eye-patterned pincers. It swings its heavy, steel pincers to smash any target.' },
        { name: 'Suicune', type: 'Water', heldItem: 'Leftovers', description: 'Said to be the reincarnation of north winds, it can instantly purify filthy, murky water.' }
      ]
    },
    {
      region: 'Hoenn',
      pokemon: [
        { name: 'Metagross', type: 'Steel / Psychic', heldItem: 'Assault Vest', description: 'With four brains linked together, it has the intelligence of a supercomputer. It easily outperforms humans.' },
        { name: 'Salamence', type: 'Dragon / Flying', heldItem: 'Salamencite', description: 'It expressed its strong desire to fly through evolution. It flies around happily, spouting intense bursts of flame.' }
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
  
  readonly cartTotal = computed(() => 
    this.cartSignal().reduce((total, item) => total + (item.product.price * item.quantity), 0)
  );

  addToCart(item: MartItem): void {
    this.cartSignal.update((currentCart) => {
      const exists = currentCart.some((cartItem) => cartItem.product.id === item.id);
      
      if (exists) {
        return currentCart.map((cartItem) => 
          cartItem.product.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }
      
      return [...currentCart, { product: item, quantity: 1 }];
    });
  }

  removeFromCart(itemId: number): void {
    this.cartSignal.update((currentCart) => {
      const targetItem = currentCart.find((cartItem) => cartItem.product.id === itemId);
      
      if (!targetItem) return currentCart;

      if (targetItem.quantity > 1) {
        return currentCart.map((cartItem) => 
          cartItem.product.id === itemId 
            ? { ...cartItem, quantity: cartItem.quantity - 1 } 
            : cartItem
        );
      }

      return currentCart.filter((cartItem) => cartItem.product.id !== itemId);
    });
  }

  clearCart(): void {
    this.cartSignal.set([]);
  }
}
