// const API_URL = 'https://fakestoreapi.com';
const API_COMMENTS = 'https://mate-api.herokuapp.com/comments';

export const getComments = async() => {
  const response = await fetch(API_COMMENTS);
  const comments = await response.json();

  // .filter(comment => comment.body && comment.name);
  return comments.data;
};

export const getProductComments = async(productId) => {
  const allComments = await getComments();
  const productComments = allComments.filter(
    comment => comment.postId === productId,
  );

  return productComments;
};
