'use client';
import React from 'react';

interface Props {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

const ScheduleBar = ({ startHour, startMinute, endHour, endMinute }: Props) => {
  let startPercentage = 0;
  let endPercentage = 0;

  function calculatePercentageInDay(
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) {
    // 입력된 시간을 분 단위로 변환
    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = endHour * 60 + endMinute;

    // 하루의 총 분 수
    const totalMinutesInDay = 24 * 60;

    // 시간을 백분율로 계산
    startPercentage = (totalStartMinutes / totalMinutesInDay) * 100;
    endPercentage = (totalEndMinutes / totalMinutesInDay) * 100;

    return [Math.round(startPercentage / 2), Math.round(endPercentage / 2)];
  }

  //   const startDivNumber = startPercentage / 2;
  //   const endDivNumber = endPercentage / 2;

  const totalArray = Array.from({ length: 48 }, (_, index) => index + 1);

  // 함수 호출하여 백분율 계산
  const percentage = calculatePercentageInDay(
    startHour,
    startMinute,
    endHour,
    endMinute
  );
  console.log(percentage);
  const [start, end] = percentage;
  //   console.log(
  //     `입력된 시간은 하루 중 약 ${percentage.toFixed(2)}% 에 해당합니다.`
  //   );
  function createIntegerArray(start: number, end: number) {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }
  console.log(createIntegerArray(start, end));
  const coloredDiv = createIntegerArray(start, end);

  return (
    <section className='flex w-[650px] h-[30px] '>
      {totalArray.map((item) => {
        return coloredDiv.includes(item) ? (
          <div
            className={`${item + ''} w-full p-1 text-xs bg-blue-400`}
            key={item}
          >
            {/* {item} */}
          </div>
        ) : (
          <div
            className={`${item + ''} w-full p-1 text-xs bg-slate-400`}
            key={item}
          >
            {/* {item} */}
          </div>
        );
      })}
    </section>
  );
};

export default ScheduleBar;
