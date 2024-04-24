"use client";
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "./loader";
import MessageInterface from "./messageInterface";
import { Button } from "@/components/ui/button";

interface Chat {
  id: string;
}

export default function ChatInterface(): JSX.Element {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  async function createNewChat(): Promise<void> {
    setLoading(true);
    const response = await fetch("/api/createChat", {
      method: "POST",
      body: JSON.stringify({}),
    });
    if (response.status === 200) {
      setLoading(false);
    }
  }

  async function deleteChat(delChatID: string): Promise<void> {
    setLoading(true);
    const response = await fetch(`/api/deleteChat?chatID=${delChatID}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
    if (response.status === 200) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch("/api/getChats")
      .then((response) => response.json())
      .then((data) => {
        setChats(data[0].data.reverse());
        if (chats[0] !== undefined) {
          setSelected(chats[0].id);
        }
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-200 w-1/4 min-w-[300px] ${
          isOpen ? "hidden md:block" : ""
        }`}
      >
        <div className="flex justify-between items-center py-4 px-6 bg-gray-700 text-white">
          <h1 className="text-lg font-semibold">Chats</h1>
          <button onClick={() => setOpen(!isOpen)}>
            {isOpen ? <AiOutlineClose /> : <RxHamburgerMenu />}
          </button>
        </div>
        <div className="px-6 py-4">
          <button
            className="flex items-center bg-gray-600 text-white rounded-lg px-3 py-2 mb-2"
            onClick={createNewChat}
          >
            <IoMdAddCircle className="mr-2" />
            New Chat
          </button>
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between bg-gray-300 rounded-lg px-3 py-2 cursor-pointer ${
                selected === chat.id ? "bg-gray-400" : ""
              }`}
              onClick={() => setSelected(chat.id)}
            >
              <p>Chat {chats.length - index}</p>
              <button onClick={() => deleteChat(chat.id)}>
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-gray-100">
        {selected && <MessageInterface key={selected} chatID={selected} />}
      </div>
    </div>
  );
}
