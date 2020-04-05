import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function AddWordModal(props) {

    const onSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal' >
            <Modal.Header className='modal-header'>
                <Modal.Title id="contained-modal-title-vcenter" className='modal-title'>
                    {'Add a new word'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body className='modal-body'>
                    <Form.Group controlId={props.controlId}>
                        <Form.Control
                            className='form-text-input'
                            type="text"
                            placeholder='Text'
                            // defaultValue={props.defaultValue}
                            // onChange={props.onChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <Button type='submit' className='modal-button'>
                        Add Word
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
