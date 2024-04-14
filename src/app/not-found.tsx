import React from "react";
//지금 이 위치는 app 폴더 내에 위치하니 글로벌 레벨인거고
//특정 페이지에서만 작동하게 하고 싶으면 그 폴더 내에 넣으면 된다

const NotFound = () => {
  return (
    <main className="not-found">
      <h1>히히 아직 준비되지 않은 페이지</h1>
      <p>미희님이 곧 해결해주실꺼에요</p>
    </main>
  );
};

export default NotFound;
