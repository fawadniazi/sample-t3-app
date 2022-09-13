import Head from "next/head";
import { prisma } from "../server/db/client";
import { trpc } from "../utils/trpc";

export default function Home(props: any) {
	const { data, isLoading } = trpc.useQuery(["example.hello"]);

	if (isLoading || !data) return <div>Loading</div>;
	return <div>{data.greeting}</div>;

	
}

export const getServerSideProps = async () => {
	const questions = await prisma.pollQuestion.findMany();

	return {
		props: {
			questions: JSON.stringify(questions),
		},
	};
};
