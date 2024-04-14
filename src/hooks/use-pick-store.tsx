import { useStore } from '@/store/store'
import { Store } from '@/types/store'

export const usePickStore = (name: keyof Store) => {
  const store = useStore()

  return store[name]
}
