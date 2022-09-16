import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading, isError } = trpc.useQuery([
		"questions.get-by-id",
		{
			id,
		},
	]);

	if (!isLoading && !data) {
		return <div>No Question Found</div>;
	}
	return (
		<div className="p-8 flex flex-col">
			{data?.isOwner && (
				<div className=" top-0 m-4 bg-indigo-400 rounded-md p-5 ">
					{" "}
					You made this
				</div>
			)}
			<div className="text-2xl font-bold">
				Question : {data?.question?.question}
			</div>
			<div>
				{(data?.question?.options as string[])?.map((option) => (
					<div key={option}> {(option as any).text}</div>
				))}
			</div>
		</div>
	);
};

const QuestionPage = () => {
	const router = useRouter();

	const query = router.query;

	const { id } = query;

	console.log(id);
	if (router.isReady) {
		if (!id || typeof id !== "string") {
			return <div>No ID</div>;
		}
		return <QuestionPageContent id={id} />;
	}
};

export default QuestionPage;
