import React from 'react';

const Post = ((props) => {
  console.log('assignment', props.activity);
  return (
    <tr>
      <td>{props.activity.instructor}</td>
      <td>{props.activity.class}</td>
      <td>{props.activity.title}</td>
      <td>{props.activity.time}</td>
    </tr>
  );
});

export default Post;
