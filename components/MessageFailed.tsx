import React from "react";

function MessageFailed({ msg }: any) {
  return (
    <div className="toast toast-center">
      <div className="alert alert-info bg-red-500 text-semibold text-white">
        <span>{msg}</span>
      </div>
    </div>
  );
}

export default MessageFailed;
