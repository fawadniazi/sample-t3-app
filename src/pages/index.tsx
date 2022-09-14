import React from "react";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const client = trpc.useContext();
	const { mutate, isLoading } = trpc.useMutation("questions.create", {
		onSuccess: () => {
			client.invalidateQueries("questions.get-all");
			if (!inputRef.current) return;
			inputRef.current.value = "";
		},
	});
	return (
		<input
			className="border-4 rounded my-6 mx-6"
			ref={inputRef}
			disabled={isLoading}
			onKeyDown={(event) => {
				if (event.key === "Enter") {
					console.log("enter!!", event.currentTarget.value);

					mutate({
						question: event.currentTarget.value,
						ownerToken: "sdsdsds",
						options: {},
					});
				}
				console.log("value?", event.currentTarget.value);
			}}
		></input>
	);
};

export default function Home() {
	const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

	if (isLoading || !data) return <div>Loading</div>;
	console.log(data);
	return (
		<div className="flex flex-col p-6">
			<div className="text-2xl font-bold">Questions </div>
			{data.map((question) => {
				return <h1 key={question.id}>{question.question}</h1>;
			})}

			<QuestionCreator />
		</div>
	);
}
