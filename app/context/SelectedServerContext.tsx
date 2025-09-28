'use client'
import React, { createContext, useContext, useState } from 'react'

type SelectedServerState = {
  selectedServerId: string | null
  setSelectedServerId: (id: string | null) => void
}

const SelectedServerContext = createContext<SelectedServerState>({
  selectedServerId: null,
  setSelectedServerId: () => {}
})

export const SelectedServerProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null)
  return (
    <SelectedServerContext.Provider value={{ selectedServerId, setSelectedServerId }}>
      {children}
    </SelectedServerContext.Provider>
  )
}

export const useSelectedServer = () => useContext(SelectedServerContext)
