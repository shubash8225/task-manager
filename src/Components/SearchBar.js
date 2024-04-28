import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'

function SearchBar(props) {

    const handleSearchTerm = (value) => {
        props.handleSearch({ term: value })
    }

    return (
        <div>
            <InputGroup>
                <Form.Control onChange={(e) => {handleSearchTerm(e.target.value)}} placeholder='Search...'  />
                <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>    
            </InputGroup>
        </div>
    )
}

export default SearchBar