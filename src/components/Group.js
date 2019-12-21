import React from 'react';
import { Card } from 'semantic-ui-react';

const Group = props => (
  <div className='group-holder'>
    <Card>
      <Card.Content header={props.groupName} />
      {console.log(props.group)}
      <Card.Content description={props.group.map(name => <p>{name}</p>)} />
    </Card>
  </div>
);

export default Group;