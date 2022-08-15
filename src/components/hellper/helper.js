import React from "react"
import styless from './helper.module.css'

export const FormAction = (inputForm, type, errors, autoFocus, value, val, { register, ...props }, keys = null) => {
    const valueKey = keys !== null ? (`${val}.${keys}`) : val
        return (
        <div className={styless.form_filling}>
            {(inputForm === 'textarea')
                ? <textarea type={type} autoFocus={autoFocus}
                    {...register(valueKey, {
                        value: value,
                        ...props
                    })}
                />
                : <input type={type} autoFocus={autoFocus}
                    {...register(valueKey, {
                        value: value,
                        ...props
                    })}
                />
            }
            <ErrorForm errors={errors} value={val} keys={keys} />
        </div>
    )
}

export const ErrorForm = ({ errors, value, keys }) => {
    return (
        <div className={styless.form_filling}>
            {keys 
            ? errors?.[value]?.[keys] && (
                <p className={styless.errorsActive}> {errors?.[value]?.[keys]?.message}</p>
            )
            : errors?.[value] && (
                <p className={styless.errorsActive} >{errors?.[value]?.message}</p>
            )}
        </div>
    )
}
