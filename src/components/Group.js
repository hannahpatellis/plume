import React from 'react';
import { Card } from 'semantic-ui-react';

const Group = props => (
  <div className='group-holder'>
    <Card>
      <Card.Content header={props.groupName} />
      <Card.Content description={props.group.map((name, i) => <p key={i}>{name}</p>)} />
    </Card>
  </div>
);

export default Group;