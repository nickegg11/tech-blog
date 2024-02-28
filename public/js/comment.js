// public/js/comment.js

const submitCommentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the comment form
  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (comment_text) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        body: comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // If successful, reload the page to see the new comment
      document.location.reload();
    } else {
      alert('Failed to create comment.');
    }
  }
};

// Attach the event listener to the comment form submit button
document.querySelector('.comment-form').addEventListener('submit', submitCommentFormHandler);
