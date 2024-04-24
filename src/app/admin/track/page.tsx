import React from 'react';

import { Button, Spacer } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import PlusButton from '@/components/ui/PlusButton';

const trackManage = () => {
  const dummyTrack = [
    { trackName: 'React 3기' },
    { trackName: 'Spring 3기' },
    { trackName: 'Spring 4기' },
    { trackName: 'React 4기' },
    { trackName: 'Spring 5기' },
  ];

  return (
    <div>
      <form className='flex'>
        <Input type='text' placeholder='트랙명 검색' />
        <Button color='danger'>검색</Button>
      </form>
      <div>
        {dummyTrack.map((track) => {
          return (
            <div className='flex' key={track.trackName}>
              <div>{track.trackName}</div>
              <span>✏️</span>
              <span>❌</span>
            </div>
          );
        })}
        <Spacer y={10} />
        <PlusButton />
      </div>
    </div>
  );
};

export default trackManage;
