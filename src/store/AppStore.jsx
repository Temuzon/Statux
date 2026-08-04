import { createContext, useContext, useMemo, useReducer } from 'react';

const initialState = {
  user: null,
  currentRoutine: null,
  history: [],
  stats: {},
  achievements: [],
  settings: {},
  tracker: {},
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.payload };
    case 'SET_CURRENT_ROUTINE': return { ...state, currentRoutine: action.payload };
    case 'SET_SETTINGS': return { ...state, settings: { ...state.settings, ...action.payload } };
    default: return state;
  }
}

const AppStoreContext = createContext(null);

export function AppStoreProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) throw new Error('useAppStore debe usarse dentro de AppStoreProvider');
  return context;
}
