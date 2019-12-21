import React from 'react';
import { Card } from 'semantic-ui-react';

const Group = props => (
  <div className='group-holder'>
    <Card>
      <Card.Content header={props.groupName} />
      <Card.Content description={props.studentNames.map(name => <p>{name}</p>)} />
    </Card>
  </div>
);

export default Group;