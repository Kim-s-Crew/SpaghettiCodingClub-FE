import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      hello world
      <div>
        <Button color="danger">nextui button</Button>
        <Button color="danger">dev test</Button>
        <p>임시 바로가기</p>
        <ul>
          <li>
            <Link href={"/login"}>로그인</Link>
          </li>
          <li>
            <Link href={"/register"}>회원가입</Link>
          </li>
          <li>
            <Link href={"/admin/student"}>수강생 관리</Link>
          </li>
          <li>
            <Link href={"/admin/student/userid"}>수강생 관리(개인)</Link>
          </li>
          <li>
            <Link href={"/admin/track"}>트랙 관리</Link>
          </li>
          <li>
            <Link href={"/admin/trackweek"}>주차 관리</Link>
          </li>
          <li>
            <Link href={"/admin/notice"}>공지사항 관리</Link>
          </li>
          <li>
            <Link href={"/admin/track"}>트랙 관리 페이지</Link>
          </li>
          <li>
            <Link href={"/admin/schedule"}>일정 관리</Link>
          </li>
          <li>
            <Link href={"/admin/teambuilding"}>팀빌딩</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
