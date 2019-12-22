import React from 'react';
import { Modal, Checkbox, Button, Icon } from 'semantic-ui-react';

const StudentPicker = props => (
  <Modal size='mini' basic open={props.modalOpen} onClose={props.modalClose}>
    <Modal.Header>Select which students to include</Modal.Header>
    <Modal.Content scrolling>
      {props.studentsMaster.map((student, i) => (
        <div key={i} className='student'>
          <Checkbox
            label={student.name}
            onChange={() => props.handleCheckboxToggle(i)}
            checked={student.present}
          />
        </div>
      ))}
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={props.modalClose} inverted>
        <Icon name='save outline' /> Save
      </Button>
    </Modal.Actions>
  </Modal>
);

export default StudentPicker;