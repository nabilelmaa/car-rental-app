import React from "react";

function MessageSuccess({ msg }: any) {
  return (
    <div className="toast toast-center">
      <div className="alert alert-info bg-green-500 text-semibold">
        <span>{msg}</span>
      </div>
    </div>
  );
}

export default MessageSuccess;
