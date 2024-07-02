import React from 'react';
import TrackSelector from '../TrackSelector';
import { Spacer } from '@nextui-org/react';
import WeekSelector from '../WeekSelector';

const SelectorSection = () => {
  return (
    <section>
      <TrackSelector />
      <Spacer y={2} />
      <WeekSelector />
      <Spacer y={2} />
    </section>
  );
};

export default SelectorSection;
