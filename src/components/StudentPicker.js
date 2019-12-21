import React from 'react';
import { Modal, Checkbox, Button } from 'semantic-ui-react';

const StudentPicker = props => (
  <Modal size='mini' basic open={props.modalOpen} onClose={props.modalClose} closeIcon>
    <Modal.Header>Select which students to include</Modal.Header>
    <Modal.Content scrolling>
      {props.originalStudentNames.map((student, i) => (
        <div className='student'>
          <Checkbox
            label={student.name}
            onChange={() => props.handleCheckboxToggle(i)}
            checked={student.present}
          />
        </div>
      ))}
    </Modal.Content>
  </Modal>
);

export default StudentPicker;