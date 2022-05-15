import React from 'react';
import { Col } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form, Row } from 'react-bootstrap';
import './styleHeader.scss';

export default function FormField({children, onSubmit, legend}) {
    return (
        <Form method='post' onSubmit={onSubmit}>
            <fieldset>
                <legend>{legend}</legend>
                
                    {children}
                
            </fieldset>
        </Form>
    );
}
