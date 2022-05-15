import React from 'react';
import { Form } from 'react-bootstrap';

const Inputbs = ({as, title, register, required, errors, pattern, minLength}) => {
    return (
        <>
            <Form.Control
                as={as}
                {...register(title, {
                    required: {
                        value: required,
                        message: 'Trường này là bắt buộc nhé 😂',
                    },
                    minLength: {
                        value: minLength,
                        message: `Trường này yêu cầu tối thiểu ${minLength} ký tự`
                    },
                    pattern: {
                        value: pattern,
                        message: `Không đúng định dạng 🤬`
                    }

                })}
            />
            <div style={{ color: 'red' }}> {errors?.message}</div>
        </>
    );
};

export default Inputbs;
