'use client';
import { Calendar } from '@nextui-org/calendar';
import {
  today,
  getLocalTimeZone,
  startOfWeek,
  startOfMonth,
} from '@internationalized/date';

import React, { useEffect, useState } from 'react';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
  console.log(selectedDate.toString());
  const dummySchedule = ['2024-04-24', '2024-04-26', '2024-04-28'];
  const formattedSchedule = dummySchedule.map((date) => {
    const dateObj = new Date(date);
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return formattedDate;
  });
  console.log(formattedSchedule);
  //['Wednesday, April 24, 2024', 'Saturday, April 27, 2024', 'Sunday, April 28, 2024']

  const scheduleDisplayer = () => {
    formattedSchedule.forEach((el) => {
      const targetDate = document.querySelector(`[aria-label="${el}"]`);
      const targetCell = targetDate?.parentElement;
      //   targetCell?.classList.add('bg-red-500');
      const icon = document.createElement('span');
      icon.innerHTML = '🔖';
      targetCell?.addEventListener('click', () => {
        console.log('눌렸어!');
      });
      targetCell?.appendChild(icon);
    });
  };

  useEffect(() => {
    scheduleDisplayer();
  }, []);

  //   const datelist = document.querySelectorAll('[aria-label="Message Body"]');
  return (
    <>
      <Calendar
        // calendarWidth={1000}
        weekdayStyle={'short'}
        color={'danger'}
        classNames={{
          base: 'w-[800px] h-[700px]',
          headerWrapper: 'w-full',
          gridHeader: 'w-full ',
          gridHeaderRow: 'flex justify-between px-[40px]',
          gridBody: 'w-full h-[400px]',
          gridBodyRow: 'w-full h-[79px]',
          cell: 'w-full h-full text-center mx-auto flex justify-center test',
        }}
        defaultValue={selectedDate}
        aria-label='Date (No Selection)'
        onChange={setSelectedDate}
      />
      {/* <Calendar /> */}
    </>
  );
};

export default Schedule;
