import React, { useEffect, useState } from 'react'
import { faCircleCheck, faEdit, faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge } from 'react-bootstrap'

function TaskItem(props) {

    const [completedDate, setCompletedDate] = useState();
    const [createdDate, setCreatedDate] = useState();


    
    useEffect(() => {
      
        if(props.completed_at) {
            setCompletedDate(splitDateTime(props.completed_at))
        }
        else {
            setCreatedDate(splitDateTime(props.created_at))
        }

    }, [props.created_at, props.completed_at])


    const splitDateTime = (value) => {

        const date = value.split('T');
        const time = date[1].split(".");
        return date[0] + " " + time[0]

    }
    

    return (
        <>
            <div className='task-item'>
                <b>{props.completed ? <s>{props.title}</s> : <>{props.title}</>}</b>{' '}
                <span>
                    <div style={{ display: 'inline', float: 'right', fontSize: '20px' }}>
                        <span onClick={props.toggleComplete}>{props.completed ? <FontAwesomeIcon className='hover' icon={faCircleCheck} color='green' /> : <Badge className='hover' bg='secondary'>Mark Complete</Badge>}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon onClick={props.onEdit} className='hover' icon={faEdit} color='royalblue' />
                    </div>
                </span><br />
                {props.desc ? (
                    props.completed ? <small style={{ color: 'darkgrey' }}><i>{props.desc}</i></small> : <small>{props.desc}</small>
                    ) : (
                        <small style={{ color: 'darkgrey' }}><i>No Description</i></small>
                    )
                }
                
                <hr />
                {/* <div> */}
                    <small>{props.completed_at ? <><Badge style={{ fontSize: '15px' }} bg='success'>Completed</Badge> on <b>{completedDate}</b></> : <>Added on <b>{createdDate}</b></>}</small>
                {/* </div> */}
                {props.completed && 
                    (
                        <div style={{ display: 'inline', float: 'right' }}>
                            <Badge onClick={props.toggleComplete} style={{ fontSize: '15px' }} className='hover' bg='primary'>Undo{' '}<FontAwesomeIcon icon={faUndo} /></Badge>
                        </div>
                    )
                }
            </div><br />
        </>
    )
}

export default TaskItem