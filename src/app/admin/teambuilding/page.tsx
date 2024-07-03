'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Team from '@/components/admin/teambuilding/Team';
import { Button, Spacer } from '@nextui-org/react';
import TrackSelector from '@/components/admin/TrackSelector';
import WeekSelector from '@/components/admin/WeekSelector';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useTrackStore } from '@/zustand/store';
import { toast } from 'react-toastify';
import { createTeam, getTeams, getUnassignedStudents } from '@/apis/team';
import {
  ServerTeam,
  Teams,
  TeamsData,
  UnassignedStudents,
  memberData,
} from '@/types/types';
import SelectorSection from '@/components/admin/teambuilding/SelectorSection';

export default function TeamBuildingPage() {
  const queryClient = useQueryClient();

  const { selectedTrack, selectedTrackWeek } = useTrackStore((state) => state);
  // const initialTeams: Teams = {
  //   '1조': {
  //     id: '1조',
  //     list: ['item 1', 'item 2', 'item 3'],
  //   },
  //   '2조': {
  //     id: '2조',
  //     list: [],
  //   },
  // };

  // console.log('test', getUnassignedStudents(1, 1));

  const { data: noTeam, refetch } = useQuery({
    queryKey: ['withoutTeam'],
    queryFn: () =>
      getUnassignedStudents(
        selectedTrack!.trackId,
        selectedTrackWeek!.trackWeekId,
      ),
    enabled: !!selectedTrack && !!selectedTrackWeek,
    select: (data) => data.payload as UnassignedStudents[],
  });
  console.log('팀없음', noTeam);

  const { data, isLoading, error } = useQuery({
    queryKey: ['team'],
    queryFn: () =>
      getTeams(selectedTrack!.trackId, selectedTrackWeek!.trackWeekId),
    enabled: !!selectedTrack && !!selectedTrackWeek,
    select: (data) => data.payload.teams as ServerTeam[],
  });
  console.log('이게 서버에서 온 팀 정보', data);

  useEffect(() => {
    if (data) {
      const transformedTeams: Teams = data.reduce(
        (acc: Teams, team: ServerTeam) => {
          acc[team.teamName] = {
            id: team.teamName,
            list: team.members.map((member) => member.userName),
            namesWithId: team.members.map((member) => {
              return { userId: member.userId, userName: member.userName };
            }),
          };
          return acc;
        },
        {} as Teams,
      );
      setTeams(transformedTeams);
    }
    if (noTeam) {
      const transformedNoTeam: Teams = {
        팀없음: {
          id: '팀없음',
          list: noTeam.map((member) => member.username),
          namesWithId: noTeam.map((member) => {
            return { userId: member.userId, userName: member.username };
          }),
        },
      };
      setTeams((prevTeams) => ({ ...prevTeams, ...transformedNoTeam }));
    }
  }, [data, noTeam]);

  const { mutate: createTeamMutation } = useMutation({
    mutationFn: createTeam,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['team'] as InvalidateQueryFilters);
      await queryClient.invalidateQueries([
        'withoutTeam',
      ] as InvalidateQueryFilters);
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || '에러가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage);
    },
  });

  // useEffect(() => {
  //   refetch();
  // }, [selectedTrackWeek, refetch]);

  const [teams, setTeams] = useState({} as Teams);
  console.log('state 에 저장된 teams', teams);

  // const onDragEnd = ({ source, destination }: DropResult) => {
  //   if (destination === undefined || destination === null) return null;
  //   if (
  //     source.droppableId === destination.droppableId &&
  //     destination.index === source.index
  //   )
  //     return null;

  //   const start = teams[source.droppableId];
  //   const end = teams[destination.droppableId];
  //   console.log({ start, end });
  //   console.log({ source, destination });

  //   if (start === end) {
  //     const newList = start.list.filter(
  //       (_: any, idx: number) => idx !== source.index,
  //     );
  //     newList.splice(destination.index, 0, start.list[source.index]);

  //     const newCol = {
  //       id: start.id,
  //       list: newList,
  //     };

  //     setTeams((state) => ({ ...state, [newCol.id]: newCol }));
  //   } else {
  //     const newStartList = start.list.filter(
  //       (_: any, idx: number) => idx !== source.index,
  //     );
  //     const newStartCol = {
  //       id: start.id,
  //       list: newStartList,
  //     };

  //     const newEndList = end.list;
  //     newEndList.splice(destination.index, 0, start.list[source.index]);
  //     const newEndCol = {
  //       id: end.id,
  //       list: newEndList,
  //     };

  //     setTeams((state) => ({
  //       ...state,
  //       [newStartCol.id]: newStartCol,
  //       [newEndCol.id]: newEndCol,
  //     }));
  //   }
  // };

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

      const newNamesWithId = [...start.namesWithId];
      const movedMember = newNamesWithId.splice(source.index, 1)[0];
      newNamesWithId.splice(destination.index, 0, movedMember);

      const newCol = {
        id: start.id,
        list: newList,
        namesWithId: newNamesWithId,
      };

      setTeams((state) => ({ ...state, [newCol.id]: newCol }));
    } else {
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index,
      );
      const newStartNamesWithId = [...start.namesWithId];
      const movedMember = newStartNamesWithId.splice(source.index, 1)[0];

      const newStartCol = {
        id: start.id,
        list: newStartList,
        namesWithId: newStartNamesWithId,
      };

      const newEndList = [...end.list];
      newEndList.splice(destination.index, 0, start.list[source.index]);
      const newEndNamesWithId = [...end.namesWithId];
      newEndNamesWithId.splice(destination.index, 0, movedMember);

      const newEndCol = {
        id: end.id,
        list: newEndList,
        namesWithId: newEndNamesWithId,
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
      namesWithId: [],
    };

    setTeams((prevTeams) => ({
      ...prevTeams,
      [`${newTeamNumber}조`]: newTeam,
    }));
  };

  // const handleSaveTeams = () => {
  //   const hasEmptyTeam = Object.values(teams).some(
  //     (team) => team.list.length === 0,
  //   );

  //   if (hasEmptyTeam) {
  //     toast.warn('비어 있는 팀이 있습니다');
  //   } else {
  //     console.log('이거라도 잘 나와라 제발', teams);

  //     const result = [] as TeamsData[];
  //     // teams를 순회
  //     for (const teamName in teams) {
  //       if (teamName === '팀없음') {
  //         continue;
  //       }
  //       const teamMembers = teams[teamName].list;
  //       console.log('teamMembers', teamMembers);
  //       // 각 팀의 멤버들을 순회
  //       for (const memberName of teamMembers) {
  //         // serverData에서 해당 멤버의 userId를 찾음
  //         for (const team of data) {
  //           const member = team.members.find(
  //             (member: memberData) => member.userName === memberName,
  //           );
  //           if (member) {
  //             console.log('멤버가 뭔데', member);
  //             // 결과 배열에 해당 팀이 이미 있는지 확인
  //             const existingTeam = result.find(
  //               (item) => item.teamName === teamName,
  //             );
  //             if (existingTeam) {
  //               // 이미 있는 경우, 멤버 ID를 추가
  //               existingTeam.memberIds.push(member.userId);
  //             } else {
  //               // 없는 경우, 새로운 팀 객체를 추가
  //               result.push({
  //                 teamName: teamName,
  //                 memberIds: [member.userId],
  //               });
  //             }
  //           }
  //         }
  //       }
  //     }
  //     console.log('결과물', result);
  //     //현재 로직은 동명 이인에 대응하지 않음. 동명이인은 고유 식별자를 붙여야 하며 테스트는 안겹치는 사람 이름으로 가능.
  //     //서버 연결까지 잘 되어있는것은 확인함.
  //     //서버에서 {"message":"해당 유저가 존재하지 않습니다."} 다음의 메시지를 정상적으로 보내옴.

  //     // createTeamMutation({
  //     //   trackId: selectedTrack!.trackId,
  //     //   trackWeekId: selectedTrackWeek!.trackWeekId,
  //     //   teamData: result,
  //     // });
  //   }
  // };

  const handleSaveTeams = () => {
    console.log(teams);

    const processedData = Object.entries(teams)
      .filter(([key, _]) => key !== '팀없음') // "팀없음" 객체 무시
      .map(([teamName, data]) => ({
        teamName,
        memberIds: data.namesWithId.map((member) => member.userId),
      }));
    console.log(processedData);
    // 이 아래는 서버 고쳐지면 다시 살릴것!
    // createTeamMutation({
    //   trackId: selectedTrack!.trackId,
    //   trackWeekId: selectedTrackWeek!.trackWeekId,
    //   teamData: processedData,
    // });
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

  if (isLoading) {
    <p>로딩중..</p>;
  }

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>팀 빌딩</h1>
      <SelectorSection />
      <Button onClick={handleSaveTeams}>조회</Button>
      <Spacer y={2} />
      <Button onClick={handleAddTeam}>팀추가</Button>
      <Button onClick={handleSaveTeams}>저장</Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-5 w-full h-min-[30vh] gap-2'>
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
