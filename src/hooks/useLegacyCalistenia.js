import { useEffect } from 'react';
import { mountLegacyRuntime } from '../legacy/runLegacyRuntime';

export function useLegacyCalistenia() {
  useEffect(() => mountLegacyRuntime(), []);
}
