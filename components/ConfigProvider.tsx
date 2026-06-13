'use client'

import { createContext, useContext } from 'react'
import { DEFAULT_CONFIG } from '@/lib/getSettings'
import type { EffectiveConfig } from '@/lib/getSettings'

const ConfigContext = createContext<EffectiveConfig>(DEFAULT_CONFIG)

export function ConfigProvider({
  config,
  children,
}: {
  config: EffectiveConfig
  children: React.ReactNode
}) {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

export function useConfig() {
  return useContext(ConfigContext)
}
