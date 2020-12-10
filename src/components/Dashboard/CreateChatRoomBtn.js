import React, { useState, useRef, useCallback } from 'react';
import {
  Button,
  Modal,
  Icon,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Schema,
  Alert,
} from 'rsuite';
import firebase from 'firebase/app';
import { database } from '../../misc/Firebase';
import { useModalState } from '../../misc/CustomHook';
/*eslint-disable*/
export const CreateChatRoomBtn = () => {
  const { isopen, open, close } = useModalState();
  const { StringType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired('Chat name is required'),
    discription: StringType().isRequired('Discription is required'),
  });
  const formref = useRef();
  const INITIAL_FORM = {
  };
  const [isloading, setisloading] = useState(false);
  const [formvalue, setFormvalue] = useState(INITIAL_FORM);
  const setFormdata = useCallback(value => {
    setFormvalue(value);
  }, []);
  const onSubmit = async () => {
    if (!formref.current.check()) {
      return;
    }
    setisloading(true);
    const newRoomDate = {
      ...formvalue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    try {
      await database.ref('rooms').push(newRoomDate);
      setisloading(false);
      setFormdata(INITIAL_FORM);
      close();
      Alert.info(`${formvalue.name} has been created`, 4000);
    } catch (err) {
      setisloading(false);
      Alert.error(err.message, 4000);
    }
  };
  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="create" />
        Create new chat room
      </Button>
      <Modal onHide={close} show={isopen} on>
        <Modal.Header>
          <Modal.Title>Create chat room</Modal.Title>
          <Modal.Body>
            <Form
              fluid
              onChange={setFormdata}
              formValue={formvalue}
              model={model}
              ref={formref}
            >
              <FormGroup>
                <ControlLabel>Room name</ControlLabel>
                <FormControl name="name" placeholder="Enter room name" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Discription</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  rows={5}
                  name="discription"
                  placeholder="Enter room discription..."
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="primary"
              onClick={onSubmit}
              disabled={isloading}
            >
              <Icon icon="create" />
              Create
            </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    </div>
  );
};
