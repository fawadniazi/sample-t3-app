import React from "react";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CreateQuestionInputType,
	createQuestionValidator,
} from "../shared/create-question-validator";
import { useRouter } from "next/router";
import { router } from "@trpc/server";

const CreateQuestionForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<CreateQuestionInputType>({
		resolver: zodResolver(createQuestionValidator),
	});
	const { mutate, isLoading, data } = trpc.useMutation("questions.create", {
		onSuccess: (data) => {
			router.push(`/question/${data.id}`);
		},
	});
	const onSubmit = (data: any) => console.log(data);
	if (isLoading || data) return <div> Loading ...</div>;

	return (
		<div className="antialiased text-gray-100 px-6">
			<div className="max-w-xl mx-auto py-12 md:max-w-4xl">
				<h2 className="text-2xl font-bold">Reset styles</h2>
				<p className="mt-2 text-lg text-gray-300">
					These are form elements this plugin styles by default.
				</p>
				<form
					onSubmit={handleSubmit((data) => {
						mutate(data);
					})}
				>
					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
						<div className="grid grid-cols-1 gap-6 col-span-2">
							<label className="block">
								<span className="text-gray-200">Question</span>
								<input
									{...register("question")}
									type="text"
									className="form-input mt-1 block w-full text-gray-800"
									placeholder="How do magnets works?"
								/>
							</label>
							{errors.question && (
								<p className="text-red-400">{errors.question.message}</p>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 col-span-2">
							<label className="block">
								<input
									type="submit"
									className="form-input  text-gray-900"
									value="Create Question"
								/>
							</label>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

const QuestionCreate: React.FC = () => {
	return <CreateQuestionForm />;
};

export default QuestionCreate;

{
	/* <label className="block">
							<span className="text-gray-200">Input (email)</span>
							<input
								type="email"
								className="form-input mt-1 block w-full"
								placeholder="john@example.com"
							/>
						</label>
						<label className="block">
							<span className="text-gray-200">Input (email, multiple)</span>
							<input
								type="email"
								multiple
								className="form-input mt-1 block w-full"
								placeholder="john@example.com"
							/>
						</label>
						<label className="block">
							<span className="text-gray-200">Input (password)</span>
							<input
								type="password"
								className="form-input mt-1 block w-full"
								placeholder="john@example.com"
							/>
						</label>
						<label className="block">
							<span className="text-gray-200">Input (date)</span>
							<input type="date" className="form-input mt-1 block w-full" />
						</label>
						<label className="block">
							<span className="text-gray-200">Input (datetime-local)</span>
							<input
								type="datetime-local"
								className="form-input mt-1 block w-full"
							/>
						</label>
						<label className="block">
							<span className="text-gray-200">Input (month)</span>
							<input type="month" className="form-input mt-1 block w-full" />
						</label>
						<label className="block">
							<span className="text-gray-200">Input (number)</span>
							<input type="number" className="form-input mt-1 block w-full" />
						</label>
						<label className="block">
							<span className="text-gray-200">Input (search)</span>
							<input type="search" className="form-input mt-1 block w-full" />
						</label>
						<label className="block">
							<span className="text-gray-200">Input (time)</span>
							<input type="time" className="form-input mt-1 block w-full" />
						</label>
						<label className="block">
							<span className="text-gray-200">Input (week)</span>
							<input type="week" className="form-input mt-1 block w-full" />
						</label>
					</div>
					<div className="grid grid-cols-1 gap-6">
						<label className="block">
							<span className="text-gray-200">Input (tel)</span>
							<input
								type="tel"
								multiple
								className="form-input mt-1 block w-full"
								placeholder="john@example.com"
							/>
						</label>
						<label className="block">
							<span className="text-gray-200">Input (url)</span>
							<input
								type="url"
								multiple
								className="form-input mt-1 block w-full"
								placeholder="john@example.com"
							/>
						</label>
						<label className="block">
							<span className="text-gray-200">Select</span>
							<select className="form-select block w-full mt-1">
								<option>Option 1</option>
								<option>Option 2</option>
							</select>
						</label>
						<label className="block">
							<span className="text-gray-200">Select (multiple)</span>
							<select className="form-multiselect block w-full mt-1" multiple>
								<option>Option 1</option>
								<option>Option 2</option>
								<option>Option 3</option>
								<option>Option 4</option>
								<option>Option 5</option>
							</select>
						</label>
						<label className="block">
							<span className="text-gray-200">Textarea</span>
							<textarea
								className="form-textarea mt-1 block w-full h-24"
								rows="3"
								placeholder="Enter some long form content."
							></textarea>
						</label>
						<fieldset className="block">
							<legend className="text-gray-200">Checkboxes</legend>
							<div className="mt-2">
								<div>
									<label className="inline-flex items-center">
										<input className="form-checkbox" type="checkbox" checked />
										<span className="ml-2">Option 1</span>
									</label>
								</div>
								<div>
									<label className="inline-flex items-center">
										<input className="form-checkbox" type="checkbox" />
										<span className="ml-2">Option 2</span>
									</label>
								</div>
								<div>
									<label className="inline-flex items-center">
										<input className="form-checkbox" type="checkbox" />
										<span className="ml-2">Option 3</span>
									</label>
								</div>
							</div>
						</fieldset>
						<fieldset className="block">
							<legend className="text-gray-200">Radio Buttons</legend>
							<div className="mt-2">
								<div>
									<label className="inline-flex items-center">
										<input
											className="form-radio"
											type="radio"
											checked
											name="radio-direct"
											value="1"
										/>
										<span className="ml-2">Option 1</span>
									</label>
								</div>
								<div>
									<label className="inline-flex items-center">
										<input
											className="form-radio"
											type="radio"
											name="radio-direct"
											value="2"
										/>
										<span className="ml-2">Option 2</span>
									</label>
								</div>
								<div>
									<label className="inline-flex items-center">
										<input
											className="form-radio"
											type="radio"
											name="radio-direct"
											value="3"
										/>
										<span className="ml-2">Option 3</span>
									</label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
			<div className="max-w-4xl mx-auto py-12">
				<h2 className="text-2xl font-bold">Untouched</h2>
				<p className="mt-2 text-lg text-gray-300">
					These are form elements we don't handle (yet?), but we use this to
					make sure we haven't accidentally styled them by mistake.
				</p>
				<div className="mt-8 grid grid-cols-2 gap-6 items-start">
					<div className="grid grid-cols-1 gap-6">
						<label className="block">
							<span className="text-gray-200">Input (range)</span>
							<input type="range" className="mt-1 block w-full" />
						</label>
						<label className="block">
							<span className="text-gray-200">Input (color)</span>
							<input type="color" className="mt-1 block w-full" />
						</label>
						<label className="block">
							<span className="text-gray-200">Input (file)</span>
							<input type="file" className="mt-1 block w-full" />
						</label>
						<label className="block">
							<span className="text-gray-200">Input (file, multiple)</span>
							<input type="file" multiple className="mt-1 block w-full" />
						</label> */
}

// /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
// <form onSubmit={handleSubmit(onSubmit)}>
// 	{/* register your input into the hook by invoking the "register" function */}
// 	<input type="text" defaultValue="test" {...register("example")} />

// 	{/* include validation with required or other standard HTML validation rules */}
// 	<input type="text" {...register("exampleRequired", { required: true })} />
// 	{/* errors will return when field validation fails  */}
// 	{errors.exampleRequired && <span>This field is required</span>}

// 	<input type="submit" />
// </form>
