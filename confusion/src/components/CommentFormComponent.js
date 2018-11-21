
import React, {Component} from 'react';
import {Button} from 'reactstrap';

class CommentForm extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Button type="button" color="light" onClick={() => console.log('comment')}>
        <span className="fa fa-pencil fa-lg"></span> Submit Comment
      </Button>
    );
  }
}

export default CommentForm;
