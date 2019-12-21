import React from 'react';
import { Input, Icon, Button } from 'semantic-ui-react';

const GroupField = props => (
  <div className='sortbuddy-holder'>
    <Input 
      size='mini'
      icon={<Icon name='refresh' inverted circular link onClick={props.handleMakeGroupsButton} />}
      onChange={props.handleNumberChange}
      value={props.numInGroups} />
    <Button size='mini' onClick={props.modalShow}><Icon name='user times' /></Button>
  </div>
);

export default GroupField;