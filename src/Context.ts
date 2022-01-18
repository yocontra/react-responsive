import React from 'react'
import { MediaQueryAllQueryable } from './types'

const Context = React.createContext<Partial<MediaQueryAllQueryable> | undefined>(undefined)

export default Context
