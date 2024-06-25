export interface CommentInterface {
  by: string,
  comment: string,
  date: string
}

export interface EditCommentInterface {
  topicIndex?: number,
  commentIndex?: number,
  comment: string
}