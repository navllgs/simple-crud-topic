import type { CommentInterface } from "./Comment";

export interface TopicInterface {
  guid: string,
  name: string,
  comments: CommentInterface[]
}