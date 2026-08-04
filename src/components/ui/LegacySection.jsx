import { memo } from 'react';

function LegacySectionBase({ html, className = '' }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export const LegacySection = memo(LegacySectionBase);
