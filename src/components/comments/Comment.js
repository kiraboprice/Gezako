
export  class Comment {
  constructor(
      authorId,
      authorName,
      authorPhotoUrl,
      createdAt,
      text,
      updatedAt
      ) {
    this.authorId = authorId;
    this.authorName = authorName;
    this.authorPhotoUrl = authorPhotoUrl;
    this.createdAt = createdAt;
    this.text = text;
    this.updatedAt = updatedAt;
  }
}
