'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { TimeInput } from '@nextui-org/react';

type scheduletype = {
  content: string;
  starttime: string;
  endtime: string;
  scheduleDate: string;
};

const CalendarPage = () => {
  const [date, onChange] = useState(new Date());
  const [schedules, setSchedule] = useState<scheduletype[]>([]);
  const [dayList, setDayList] = useState(['2024-03-26', '2024-03-27']);
  //   const [showSchedule, setShowSchedule] = useState(false);
  console.log(schedules);
  console.log(dayList);

  let starttimeInput: HTMLInputElement;
  let endtimeInput: HTMLInputElement;
  let contentInput: HTMLInputElement;

  // const dayList = ["2024-03-26", "2024-03-27"];

  const addContent = ({ date }: any) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((day) => day === dayjs(date).format('YYYY-MM-DD'))) {
      contents.push(
        <>
          <div className='w-[20px] h-[20px] bg-yellow-300 rounded-full'>*</div>
        </>
      );
    }

    return (
      <>
        <div>{contents}</div>
        <span
          onClick={(e) => {
            e.stopPropagation();
            Swal.fire({
              title: dayjs(date).format('YYYY-MM-DD'),
              html: `    <label for="starttime">시작시간</label>
                            <input type="time" id="starttime" class="swal2-input" placeholder="Password">
                            <br/>
                            <label for="endtime">끝나는 시간</label>
                            <input type="time" id="endtime" class="swal2-input" placeholder="Password">
                                  <input type="text" id="content" class="swal2-input" placeholder="content">
                                `,
              confirmButtonText: '일정 저장',
              showCancelButton: true,
              cancelButtonText: '취소',
              focusConfirm: false,
              didOpen: () => {
                const popup = Swal.getPopup()!;
                contentInput = popup.querySelector(
                  '#content'
                ) as HTMLInputElement;
                starttimeInput = popup.querySelector(
                  '#starttime'
                ) as HTMLInputElement;
                endtimeInput = popup.querySelector(
                  '#endtime'
                ) as HTMLInputElement;
              },
              preConfirm: () => {
                const content = contentInput.value;
                const starttime = starttimeInput.value;
                const endtime = endtimeInput.value;
                const scheduleDate = dayjs(date).format('YYYY-MM-DD');

                if (starttime > endtime) {
                  Swal.fire('시간을 제대로 입력하세요');

                  return;
                }

                return { content, starttime, endtime, scheduleDate };
              },
            }).then((result) => {
              console.log('리절트', result);
              if (result.isDismissed === true) return;
              // if (result.value === true) {
              //   alert("시간을 제대로 입력하세요!");
              //   return;
              // }
              console.log('리설트 벨류', result.value);
              if (result.value !== true) {
                setSchedule((prev) => [...prev, result.value]);

                setDayList((prev) => [...prev, result.value.scheduleDate]);
              }
              console.log('스케줄', schedules);
            });
          }}
          className='days-btn'
        >
          +
        </span>
      </>
    ); // 각 날짜마다 해당 요소가 들어감
  };
  return (
    <>
      <Calendar
        value={date}
        formatDay={(locale, date) => dayjs(date).format('D')}
        tileContent={addContent}
        onChange={onChange}
        locale='ko'
        showNeighboringMonth={false}
        // onClickDay={clickDays}
      />
      <div>{dayjs(date).format('YY년-M월-D일')}</div>
      <div>
        {schedules?.map((schedule) => {
          console.log('여기', schedule);
          console.log(date);
          if (dayjs(date).format('YYYY-MM-DD') !== schedule.scheduleDate)
            return;
          return (
            <>
              {schedule ? (
                <>
                  {/* <h1>일정 날짜: {schedule.scheduleDate}</h1> */}
                  <div className='flex border-black border-2 w-[800px]'>
                    <div className='w-[4.17%] bg-white h-[20px]'>0</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>1</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>2</div>
                    <div className='w-[4.17%] bg-slate-600 h-[20px]'>3</div>
                    <div className='w-[4.17%] bg-slate-600 h-[20px]'>4</div>
                    <div className='w-[4.17%] bg-slate-600 h-[20px]'>5</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>6</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>7</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>8</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>9</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>10</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>11</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>12</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>13</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>14</div>
                  </div>

                  <p>시작시간:{schedule.starttime}</p>

                  <p>끝나는 시간:{schedule.endtime}</p>
                  <br />
                  <p>{schedule.content}</p>
                </>
              ) : null}
            </>
          );
        })}
      </div>
    </>
  );
};

export default CalendarPage;
