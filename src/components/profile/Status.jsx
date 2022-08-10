import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'

const Status = ({status}) => {
    const { register, formState: {errors}, handleSubmit } = useForm({mode: 'onBlur'})
    const [isEdit, setIsEdit] = useState(false)
    const onEdit = () => setIsEdit(true)
    const onStatus = (data) => {
        setIsEdit(false)
    }

    return (
        <div>
            { isEdit && 
                <div >
                    <textarea type="text" 
                        autoFocus
                        {...register('status',{
                            value: status,
                            maxLength: {value: 100, message: "max length 100 symboll"},
                            onBlur:handleSubmit(onStatus),
                        })}
                    />
                    <div>{errors?.status && errors?.status.message}</div>
                </div>
            }
            {!isEdit &&
            <h3 onDoubleClick={onEdit}>{ status || "Add status" }</h3>
            }
        </div>
    );    
}





const ContainerStatus = () => {
    const { status } = useSelector(state => state.profile)

    return (
        <Status status={status}/>
    );
};

export default ContainerStatus;