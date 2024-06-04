'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Team from '@/components/admin/teambuilding/Team';
import { Button, Input, Spacer } from '@nextui-org/react';
import TrackSelector from '@/components/admin/TrackSelector';
import WeekSelector from '@/components/admin/WeekSelector';
import { useQuery } from '@tanstack/react-query';
import { getTrackWeekDetail } from '@/apis/trackWeek';
import useStore from '@/zustand/store';
import { set } from 'react-hook-form';

type TItemStatus = 'todo' | 'doing';

export type TItem = {
  id: string;
  status: TItemStatus;
  title: string;
};

export type TItems = {
  [key in TItemStatus]: TItem[];
};

export default function TeamBuildingPage() {
  const { selectedTrack, selectedTrackWeek } = useStore((state) => state);
  const initialTeams = {
    '1조': {
      id: '1조',
      list: ['item 1', 'item 2', 'item 3'],
    },
    '2조': {
      id: '2조',
      list: [],
    },
    '3조': {
      id: '3조',
      list: [],
    },
    임시조: {
      id: '임시조',
      list: ['미희', '래준', '대영', '은채'],
    },
  };

  const { data, refetch } = useQuery({
    queryKey: ['selectedTrackWeek'],
    queryFn: () =>
      getTrackWeekDetail(
        selectedTrack!.trackId,
        selectedTrackWeek!.trackWeekId,
      ),
  });

  useEffect(() => {
    refetch();
  }, [selectedTrackWeek, refetch]);

  console.log(data);

  const [teams, setTeams] = useState(initialTeams);
  console.log(teams);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = teams[source.droppableId];
    const end = teams[destination.droppableId];
    console.log(start, end);
    console.log(source, destination);
    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index,
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setTeams((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index,
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setTeams((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <>
      <TrackSelector />
      <Spacer y={2} />
      <WeekSelector />
      <Spacer y={2} />

      <Button>조회</Button>
      <Spacer y={2} />
      <Input placeholder='팀명' />
      <Button onClick={() => console.log('ghg')}>팀추가</Button>
      <Button>저장</Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-3 m-[10vh] w-[80%] h-[80vh] gap-2'>
          {Object.values(teams).map((team) => (
            <Team col={team} key={team.id} />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
