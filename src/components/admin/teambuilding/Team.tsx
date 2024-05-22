import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Member from './Member';

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}

const Team: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      {loaded && (
        <Droppable droppableId={id}>
          {(provided) => (
            <div className='p-5 flex flex-col mt-2'>
              <h2>{id}</h2>
              <div
                className='bg-slate-400 rounded-md p-2 flex flex-col grow mt-1'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.map((text, index) => (
                  <Member key={text} text={text} index={index} />
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      )}
    </>
  );
};

export default Team;
