import type { ICreatePostInput } from "../../createPost/types/createPost.types";

export interface IPostLists extends ICreatePostInput {
	id: number;
}

export interface IEditPostDataInput extends ICreatePostInput {
	id: number | null;
}