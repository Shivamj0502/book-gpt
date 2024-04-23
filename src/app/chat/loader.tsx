import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";

export default function Loader() {
	const [prog, setProg] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			if (prog < 100) {
				setProg(prog + 1);
			}
		}, 50);
	}, [prog]);

	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="w-[50%] flex flex-col justify-center items-center">
				<Progress value={prog} />
				{prog > 90 ? (
					<p>It is taking longer than expected. Please wait...</p>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}
