'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Team from '@/components/admin/teambuilding/Team';
import { Button, Spacer } from '@nextui-org/react';
import TrackSelector from '@/components/admin/TrackSelector';
import WeekSelector from '@/components/admin/WeekSelector';
import { useQuery } from '@tanstack/react-query';
import { getTrackWeekDetail } from '@/apis/trackWeek';
import { useTrackStore } from '@/zustand/store';
import { toast } from 'react-toastify';

// type TItemStatus = 'todo' | 'doing';

// export type TItem = {
//   id: string;
//   status: TItemStatus;
//   title: string;
// };

// export type TItems = {
//   [key in TItemStatus]: TItem[];
// };

type TeamData = {
  id: string;
  list: string[] | never[];
};

type Teams = {
  [key: string]: TeamData;
};

export default function TeamBuildingPage() {
  const { selectedTrack, selectedTrackWeek } = useTrackStore((state) => state);
  const initialTeams: Teams = {
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
    '4조': {
      id: '4조',
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

  const [teams, setTeams] = useState(initialTeams);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = teams[source.droppableId];
    const end = teams[destination.droppableId];
    console.log({ start, end });
    console.log({ source, destination });

    if (start === end) {
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index,
      );
      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList,
      };

      setTeams((state) => ({ ...state, [newCol.id]: newCol }));
    } else {
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index,
      );
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      const newEndList = end.list;
      newEndList.splice(destination.index, 0, start.list[source.index]);
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      setTeams((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
    }
  };

  const handleAddTeam = () => {
    const existingTeamNumbers = Object.keys(teams)
      .map((key) => parseInt(key.replace('조', '')))
      .filter((num) => !isNaN(num));

    const newTeamNumber =
      existingTeamNumbers.length > 0 ? Math.max(...existingTeamNumbers) + 1 : 1;

    const newTeam = {
      id: `${newTeamNumber}조`,
      list: [],
    };

    setTeams((prevTeams) => ({
      ...prevTeams,
      [`${newTeamNumber}조`]: newTeam,
    }));
  };

  const handleSaveTeams = () => {
    const hasEmptyTeam = Object.values(teams).some(
      (team) => team.list.length === 0,
    );

    if (hasEmptyTeam) {
      toast.warn('비어 있는 팀이 있습니다');
    } else {
      console.log('Teams saved:', teams);
    }
  };

  const handleDeleteTeam = (teamId: string) => {
    const team = teams[teamId];
    if (team.list.length > 0) {
      toast.warn('팀에 배정된 수강생이 있습니다');
    } else {
      setTeams((prevTeams) => {
        const newTeams = { ...prevTeams };
        delete newTeams[teamId];

        const sortedTeams = Object.keys(newTeams)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .reduce((acc, key, index) => {
            const newKey = `${index + 1}조`;
            acc[newKey] = { ...newTeams[key], id: newKey };
            return acc;
          }, {} as typeof newTeams);

        return sortedTeams;
      });
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
      <Button onClick={handleAddTeam}>팀추가</Button>
      <Button onClick={handleSaveTeams}>저장</Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-5 w-full h-[80vh] gap-2'>
          {Object.values(teams).map((team) => (
            <div key={team.id}>
              <Team col={team} handleDeleteTeam={handleDeleteTeam} />
            </div>
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
