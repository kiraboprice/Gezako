
export  class Comment {
  constructor(
      authorId,
      authorName,
      authorPhotoUrl,
      createdAt,
      text
      ) {
    this.authorId = authorId;
    this.authorName = authorName;
    this.authorPhotoUrl = authorPhotoUrl;
    this.createdAt = createdAt;
    this.text = text;
  }
}