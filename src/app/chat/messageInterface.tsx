import React, { useEffect, useRef, useState } from "react";
import Loader from "./loader";

type messPropsType = {
	chatID: string;
};

export default function MessageInterface(this: any, props: messPropsType) {
	console.log("message ran");
	const [messgs, setMessgs] = useState<any[]>([]);
	const [inputPrompt, setInputPrompt] = useState<string>("");
	const [isLoading, setLoading] = useState<any>(true);

	useEffect(() => {
		fetch("/api/getMessages?chatID=" + props.chatID, {
			cache: "force-cache",
		})
			.then((response) => response.json())
			.then((data) => {
				setMessgs(data[0].data);

				let chat = document.getElementById("chat");
				if (chat !== null) {
					chat.scrollTop = chat.scrollHeight;
				}
				setLoading(false);
			});
	}, [isLoading === true]);

	if (isLoading === true || isLoading === null)
		return (
			<div className="w-full h-[100vh]">
				<Loader />
			</div>
		);

	async function getGPTresponse(
		event: React.FormEvent
	): Promise<React.FormEventHandler<HTMLFormElement> | undefined> {
		setLoading(null);
		const response = await fetch(
			"/api/openai?prompt=" + inputPrompt + "&chatID=" + props.chatID,
			{
				method: "POST",
				body: JSON.stringify({}),
			}
		);
		if (response.status === 200) {
			setLoading(true);
			setMessgs([]);
			// setLoading(false);
		}
		return;
	}

	return (
		<div>
			<div
				id="chat"
				className="bg-gray-100 w-full h-[90vh] overflow-y-scroll"
			>
				<div className="w-[70%] ml-[10%] mt-8 space-y-4 mb-[50vh]">
					{messgs.map(
						(element: {
							id: string;
							query: string;
							response: string;
						}) => {
							return (
								<div key={element.id}>
									<div>
										<h3 className="font-bold">You</h3>
										<p>{element.query}</p>
									</div>
									<div>
										<h3 className="font-bold">
											Arjun's GPT
										</h3>
										<p>{element.response}</p>
									</div>
								</div>
							);
						}
					)}
				</div>
			</div>
			<div className="h-[10vh] bg-gray-100">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						getGPTresponse(e);
					}}
				>
					<div>
						<input
							className="border border-black w-[65vw] mx-[5vw] mb-8 rounded-md py-4 px-2 absolute bottom-0 pr-[5vw]"
							type="text"
							name="prompt"
							id="promptInput"
							placeholder="Ask a question..."
							onChange={(e) => setInputPrompt(e.target.value)}
						/>
						<button
							className="z-20 mx-[5vw] mb-8 rounded-md py-4 px-2 absolute bottom-0 right-0"
							type="button"
							id=""
							onClick={getGPTresponse}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
