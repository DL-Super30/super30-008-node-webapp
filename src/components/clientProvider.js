// components/ClientProvider.js
"use client"; // Mark this as a Client Component

import { Provider } from 'react-redux';
import store from '../app/components/store';

export default function ClientProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
