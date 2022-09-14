import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
	const client = trpc.useContext();

	const { mutate } = trpc.useMutation("questions.create", {
		onSuccess: () => {
			client.invalidateQueries("questions.get-all");
		},
	});
	return (
		// <input
		// 	className="border-4 rounded my-6 mx-6"
		// 	onSubmit={(event) => {
		// 		console.log("value?", event.currentTarget.value);
		// 	}}
		// ></input>

		<input
			className="border-4 rounded my-6 mx-6"
			onKeyDown={(event) => {
				if (event.key === "Enter") {
					console.log("enter!!", event.currentTarget.value);

					mutate({
						question: event.currentTarget.value,
						ownerToken: "sdsdsds",
						options: {},
					});
					event.currentTarget.value = "";
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
