import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";

const QuestionCreate: React.FC = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const client = trpc.useContext();
	const { mutate, isLoading } = trpc.useMutation("questions.create", {
		onSuccess: () => {
			client.invalidateQueries("questions.get-all-my-questions");
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

export default QuestionCreate;
