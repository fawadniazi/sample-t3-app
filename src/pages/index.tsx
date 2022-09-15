import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";



export default function Home() {
	const { data, isLoading } = trpc.useQuery(["questions.get-all-my-questions"]);

	if (isLoading || !data) return <div>Loading</div>;
	console.log(data);
	return (
		<div className="flex flex-col p-6 w-screen">
			<div className="header flex w-full justify-between">
				<div className="text-2xl font-bold">Your Questions </div>
				<Link href="/create">
					<a className="bg-gray-300 rounded text-gray-800 p-4">
						Create New Questions
					</a>
				</Link>
			</div>

			{data.map((question) => {
				return (
					<div key={question.id} className="flex flex-col my-2">
						<Link href={`question/${question.id}`}>
							<a>
								<div className="my-2">{question.question}</div>

								<span className="">
									Created on {question.createdAt.toDateString()}
								</span>
							</a>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
