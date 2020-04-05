import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function AddWordModal(props) {
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
        </Modal>
    )
}
