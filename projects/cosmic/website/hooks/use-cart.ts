'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: string
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  itemCount: number
  total: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)

        if (existingItem) {
          // Update quantity of existing item
          return set((state) => {
            const updatedItems = state.items.map((i) => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + item.quantity } 
                : i
            )
            
            return {
              items: updatedItems,
              itemCount: calculateItemCount(updatedItems),
              total: calculateTotal(updatedItems),
            }
          })
        }

        // Add new item
        set((state) => {
          const updatedItems = [...state.items, item]
          return {
            items: updatedItems,
            itemCount: calculateItemCount(updatedItems),
            total: calculateTotal(updatedItems),
          }
        })
      },

      removeItem: (id) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id)
          return {
            items: updatedItems,
            itemCount: calculateItemCount(updatedItems),
            total: calculateTotal(updatedItems),
          }
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          return get().removeItem(id)
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
          
          return {
            items: updatedItems,
            itemCount: calculateItemCount(updatedItems),
            total: calculateTotal(updatedItems),
          }
        })
      },

      clearCart: () => {
        set({ items: [], itemCount: 0, total: 0 })
      },
    }),
    {
      name: 'cosmic-puppies-cart',
      skipHydration: true,
    }
  )
)

// Helper functions
function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + (Number(item.price) * item.quantity)
  }, 0)
}