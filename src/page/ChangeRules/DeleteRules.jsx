import { useMutation } from '@apollo/client';
import { useState } from 'react';
import FormField from '../../component/FormField';
import TableRules from './TableRules';
import { DELETE_RULES } from '../../graphql/mutations';

function DeleteRules({ nav }) {
    const [loadDeleteRules, { data, loading, error, called }] = useMutation(DELETE_RULES);
    const [state, setState] = useState(false);
    const handleDelete = (value) => {
        setState(false);
        console.log(value);
        loadDeleteRules({
            variables: { ma: value },
            onCompleted: () => {
                setState(true);
            },
        });
    };

    return (
        <div>
            <FormField legend={'Danh sách loại tiết kiệm:'}>
                <TableRules nav={nav} handleDelete={handleDelete} reFetch={state} />
            </FormField>
        </div>
    );
}

export default DeleteRules;
