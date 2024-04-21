"use client";
import Image from "next/image";
import React, { useState } from "react";
import nbcIcon from "@/assets/images/spaghetti_logo.png";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";

const RegisterPage = () => {
  const selectItems = [{ value: "react 3rd" }, { value: "vue 3rd" }];
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
    track: "",
    admin: false,
    recommend: "",
  });

  const inputHandler = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const inputCheckHandler = (e: any) => {
    console.log(e);
    setInputs({ ...inputs, [e.target.name]: e.target.checked });
  };

  const cancelRegister = () => {
    setInputs({
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      track: "",
      admin: false,
      recommend: "",
    });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(inputs);
    alert("회원가입 성공");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Image src={nbcIcon} alt="이미지" width={800} height={400} />
      </div>
      <form
        className="flex flex-col gap-2 justify-center pr-10 items-center w-[600px]"
        onSubmit={submitHandler}
      >
        <Input
          aria-label="이름"
          type="text"
          name="name"
          value={inputs.name}
          placeholder="name"
          onChange={inputHandler}
        />
        <Input
          aria-label="이메일"
          type="text"
          name="email"
          value={inputs.email}
          placeholder="email"
          onChange={inputHandler}
        />
        <Input
          aria-label="비밀번호"
          type="password"
          name="password"
          value={inputs.password}
          placeholder="password"
          onChange={inputHandler}
        />
        <Input
          aria-label="비밀번호 재확인"
          type="password"
          name="passwordCheck"
          value={inputs.passwordCheck}
          placeholder="passwordCheck"
          onChange={inputHandler}
        />
        <Select
          name="track"
          items={selectItems}
          placeholder="트랙을 선택하세요"
          onChange={inputHandler}
          value={inputs.track}
        >
          {(selectItem) => (
            <SelectItem key={selectItem.value}>{selectItem.value}</SelectItem>
          )}
        </Select>
        <div>
          <Checkbox
            id="adminCheck"
            name="admin"
            checked={inputs.admin}
            placeholder="adminCheck"
            onChange={inputCheckHandler}
          >
            관리자이신가요?
          </Checkbox>
        </div>
        <Input
          aria-label="추천인 메일"
          type="text"
          name="recommend"
          value={inputs.recommend}
          placeholder="추천인 email"
          onChange={inputHandler}
        />
        <div>
          <Button type="submit" color="danger" className="mr-2">
            회원가입
          </Button>
          <Button type="button" onClick={cancelRegister}>
            취소
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
