"use client";
import Image from "next/image";
import React, { useState } from "react";
import nbcIcon from "@/assets/images/scc-og.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Spacer } from "@nextui-org/react";

const LoginPage = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("하이");
    console.log("아이디>>", id, "비밀번호>>", pw);
    router.push("/tempmain");
  };

  return (
    <div className="이거야이거 flex h-[100vh] items-center ">
      <div className="flex items-center">
        <div>
          <Image src={nbcIcon} alt="nbc icon" width={800} height={400} />
        </div>
        <div>
          <form onSubmit={loginHandler} className="flex flex-col pr-10 gap-2">
            <Input
              type="email"
              value={id}
              placeholder="이메일을 입력하세요"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <Input
              type="password"
              value={pw}
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => {
                setPw(e.target.value);
              }}
            />
            <Spacer />
            <div className="flex gap-2 justify-between">
              <Button type="submit" color="danger">
                로그인 test
              </Button>
              <Link href="/register">
                <Button>회원가입</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
