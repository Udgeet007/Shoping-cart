import { useEffect, useState } from "react";


export function useLocalStorage<T>(Key: string, initialValue : T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(Key)
    if (jsonValue != null)return JSON.parse(jsonValue)

    if (typeof initialValue === "function") {
      return (initialValue as () => T)()

    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(Key, JSON.stringify(value))
  }, [Key, value])
  return [value, setValue] as [typeof value, typeof setValue]
}