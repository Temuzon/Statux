import { useMemo } from 'react';
import { calisteniaMarkup } from '../../legacy/calisteniaMarkup';
import { useLegacyCalistenia } from '../../hooks/useLegacyCalistenia';
import { LegacySection } from './LegacySection';

export function AppShell() {
  useLegacyCalistenia();
  const markup = useMemo(() => calisteniaMarkup, []);
  return <LegacySection html={markup} className="calistenia-shell" />;
}
