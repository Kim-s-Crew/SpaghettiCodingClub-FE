"use client";

import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Modal from "@/components/ui/Modal";
import PlusButton from "@/components/ui/PlusButton";
import StudentInfo from "@/components/admin/student/StudentInfo";
import Team from "@/components/admin/teambuilding/Team";

type TItemStatus = "todo" | "doing";

export type TItem = {
  id: string;
  status: TItemStatus;
  title: string;
};

export type TItems = {
  [key in TItemStatus]: TItem[];
};

export default function TeamBuildingPage() {
  const initialTeams = {
    "1조": {
      id: "1조",
      list: ["item 1", "item 2", "item 3"],
    },
    "2조": {
      id: "2조",
      list: [],
    },
    "3조": {
      id: "3조",
      list: [],
    },
    임시조: {
      id: "임시조",
      list: ["미희", "래준", "대영", "은채"],
    },
  };
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
        (_: any, idx: number) => idx !== source.index
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
        (_: any, idx: number) => idx !== source.index
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 m-[10vh] w-[80%] h-[80vh] gap-2">
        {Object.values(teams).map((team) => (
          <Team col={team} key={team.id} />
        ))}
      </div>
    </DragDropContext>
  );
}
