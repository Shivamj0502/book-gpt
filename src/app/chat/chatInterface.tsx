"use client";
import { prisma } from "@/lib/prisma";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import MessageInterface from "./messageInterface";
import { Button } from "@/components/ui/button";
import Loader from "./loader";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

export default function ChatInterface() {
	const [chats, setChats] = useState<any[]>([]);
	const [isLoading, setLoading] = useState<any>(true);
	const [isOpen, setOpen] = useState<any>(false);
	const [selected, setSelected] = useState("");
	var i = 0;

	async function createNewChat(): Promise<void> {
		setLoading(null);
		const response = await fetch("/api/createChat", {
			method: "POST",
			body: JSON.stringify({}),
		});
		if (response.status === 200) {
			setLoading(true);
			// setSelected("");
		}
	}

	async function deleteChat(delChatID: string): Promise<void> {
		setLoading(null);
		const response = await fetch("/api/deleteChat?chatID=" + delChatID, {
			method: "POST",
			body: JSON.stringify({}),
		});
		if (response.status === 200) {
			setLoading(true);
			// setSelected("");
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
	}, [isLoading === true]);

	if (isLoading === true || isLoading === null)
		return (
			<div className="h-screen w-screen">
				<Loader />
			</div>
		);
	function openMenu(): void {
		throw new Error("Function not implemented.");
	}

	// if (!chats) return <p>No chats</p>;

	return (
		<div>
			<div className="flex max-md:bg-gray-100 max-md:h-screen max-md:overflow-hidden">
				<div className="relative">
					<div className="h-[5vh] bg-gray-700 z-50 md:hidden">
						<Button
							className="bg-none absolute top-[2vh] left-[3vw] w-[35px] h-[35px] rounded-[50%]"
							onClick={() => setOpen(!isOpen)}
						>
							<div className="absolute">
								{isOpen ? (
									<div>
										<AiOutlineClose />
									</div>
								) : (
									<div>
										<RxHamburgerMenu />
									</div>
								)}
							</div>
						</Button>
					</div>
					<div
						id="sidebar"
						className={
							`bg-gray-700 w-[25vw] h-[90vh]  overflow-y-scroll max-md:z-30 ` +
							(isOpen ? "max-md:w-[100vw]" : "max-md:hidden")
						}
					>
						<div id="messList" className="mt-4 mx-4 space-y-4">
							<div
								id="message-preview"
								className=" text-white w-inherit h-[50px] flex justify-start items-center bg-gray-600 z-10 rounded-lg overflow-hidden"
								onClick={createNewChat}
							>
								{/* <i className="fa-solid fa-square-plus"></i>  */}

								<div
									style={{ whiteSpace: "nowrap" }}
									className="overflow-hidden mx-4 flex items-center gap-2"
								>
									<div className="">
										<IoMdAddCircle />
									</div>
									<p>New Chat</p>
								</div>
							</div>
							{chats.map((element: { id: string }) => {
								i++;

								return (
									<div
										key={element.id}
										onClick={() => setSelected(element.id)}
										id="message-preview"
										className={
											` text-white w-inherit h-[50px] flex justify-between items-center hover:bg-gray-600 z-10 rounded-lg overflow-hidden ` +
											(selected === element.id
												? "bg-gray-600"
												: "")
										}
									>
										<p
											style={{ whiteSpace: "nowrap" }}
											className="overflow-hidden mx-4"
										>
											Chat no. {chats.length - i + 1}
										</p>
										<button
											className="pr-4 z-50"
											onClick={() =>
												deleteChat(element.id)
											}
										>
											<MdDelete />
										</button>
									</div>
								);
							})}
						</div>
					</div>
					<div
						className={
							`h-[10vh] bg-gray-700 ` +
							(isOpen ? "max-md:w-[100vw]" : "max-md:hidden")
						}
					>
						<form
							className="absolute bottom-[2vh] flex justify-center w-full"
							method="post"
						>
							<Button
								className="bg-none"
								id="logout"
								formAction="/auth/logout"
							>
								Logout
							</Button>
						</form>
					</div>
				</div>
				{selected !== "" ? (
					<div
						className={
							`w-[75vw] h-screen max-md:w-[100vw] max-md:pt-[5vh] max-md:overflow-hidden ` +
							(isOpen ? "max-md:hidden" : "")
						}
					>
						<MessageInterface key={selected} chatID={selected} />
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}
