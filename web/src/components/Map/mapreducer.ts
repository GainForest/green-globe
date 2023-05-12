type ActionTypes = 'TOGGLE_THEME'

type Theme = 'light' | 'dark'

interface State {
  theme: Theme
}

export const initialState: State = {
  theme: 'dark',
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME': {
      return { ...state, theme: state.theme == 'dark' ? 'light' : 'dark' }
    }
    default: {
      return state
    }
  }
}
