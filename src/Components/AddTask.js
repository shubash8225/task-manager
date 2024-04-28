import React, { useRef } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';

function AddTask(props) {

    const title = useRef();
    const description = useRef();

    const MissingToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const validateData = () => {

        if(title.current.value === '' || title.current.value === null) {
            MissingToast.fire({
                title: 'Task cannot be empty!',
                icon: 'error'
            })
        }
        else {
            
            props.handleSubmit({
                title: title.current.value,
                description: description.current.value
            })
            title.current.value = '';
            description.current.value = '';
        }

    }


    return (
        <div style={{ width: '50%', margin: 'auto', marginTop: '20px', marginLeft: '600px'}}>
            <Form>
                <Row>
                    <Col>
                        <Form.Control ref={title} name='title' placeholder='Task Title...' />
                    </Col>
                    <Col>
                        <Form.Control ref={description} name='description' placeholder='Add Description (optional)' />
                    </Col>
                    <Col>
                        <Button onClick={() => validateData()}>Add</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default AddTask