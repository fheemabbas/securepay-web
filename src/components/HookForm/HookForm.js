import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function HookForm(props) {
    let { onSubmit, init } = props;

    const method = useForm({
        mode: "onChange",
        defaultValues: props.defaultForm,
        criteriaMode: "all"
    });

    useEffect(() => {
        init && init(method);
    }, [])

    return (
        <form onSubmit={method.handleSubmit(onSubmit)}>
            {props.children(method)}
        </form>
    );
}

HookForm.defaultProps = {
    defaultValues: {},
    onSubmit: () => {  }
}
export default HookForm;
