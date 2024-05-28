export interface ICreatePostInput {
	title: string;
	post_content: string;
	image?: string;
}

export interface IPostLists extends ICreatePostInput {
	id: number;
}
