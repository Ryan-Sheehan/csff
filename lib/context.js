import React, { createContext, useContext, useEffect, useState } from 'react'
import { Base64 } from 'base64-string'

// get our API client
import { getSanityClient } from '@lib/sanity'

// get our global image GROQ
import { queries } from '@data'

// Set our initial context states
const initialContext = {
  isPageTransition: false,
  meganav: {
    isOpen: false,
    activeID: null,
  },
  isLoading: true,
}

// Set context
const SiteContext = createContext({
  context: initialContext,
  setContext: () => null,
})

/*  ------------------------------ */
/*  Our Context Wrapper
/*  ------------------------------ */

const SiteContextProvider = ({ data, children }) => {
  const [context, setContext] = useState({
    ...initialContext,
  })

  return (
    <SiteContext.Provider
      value={{
        context,
        setContext,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

// Access our global store states
function useSiteContext() {
  const { context } = useContext(SiteContext)
  return context
}

// Toggle page transition state
function useTogglePageTransition() {
  const {
    context: { isPageTransition },
    setContext,
  } = useContext(SiteContext)

  async function togglePageTransition(state) {
    setContext((prevState) => {
      return { ...prevState, isPageTransition: state }
    })
  }
  return togglePageTransition
}

// Toggle Mega Navigation states
function useToggleMegaNav() {
  const {
    context: { meganav },
    setContext,
  } = useContext(SiteContext)

  async function toggleMegaNav(state, id = null) {
    setContext((prevState) => {
      return {
        ...prevState,
        meganav: {
          isOpen: state === 'toggle' ? !meganav.isOpen : state,
          activeID: state === 'toggle' && meganav.isOpen ? null : id,
        },
      }
    })
  }
  return toggleMegaNav
}

export {
  SiteContextProvider,
  useSiteContext,
  useTogglePageTransition,
  useToggleMegaNav,
}
