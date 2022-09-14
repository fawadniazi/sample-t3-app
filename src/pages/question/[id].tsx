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
	return <div>{data?.question}</div>;
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
