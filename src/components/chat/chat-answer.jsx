import { memo } from "react";
import Parser from "html-react-parser";
import "~/styles/chat-answer.css";

const ChatAnswer = ({ answer }) => {
  return <div className="bg-zinc-900">{Parser(answer)}</div>;
};

export default memo(ChatAnswer);
