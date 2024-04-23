import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Arjun's GPT",
	description: "Handcrafed with ❤️ by Arjun Khanna",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`font-sans ${inter.variable}`}>{children}</body>
		</html>
	);
}
