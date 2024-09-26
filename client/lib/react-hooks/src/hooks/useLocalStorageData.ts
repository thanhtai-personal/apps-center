import { useEffect, useState } from "react"

export const useLocalStorageData: (dataKey: string) => any[] = (dataKey: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dataKey) {
      const storedData = localStorage.getItem(dataKey);
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [dataKey])

  useEffect(() => {
    if (data) {
      localStorage.setItem(dataKey, JSON.stringify(data));
    } else {
      localStorage.removeItem(dataKey);
    }
  }, [data])

  return [data, setData] as any[]
}