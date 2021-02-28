import React from 'react'
import { MediaQueryAllQueryable } from './types'

const Context = React.createContext<Partial<MediaQueryAllQueryable>>({})

export default Context
