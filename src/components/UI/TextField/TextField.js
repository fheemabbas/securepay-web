import React from 'react';
import { Form } from 'react-bootstrap';
import './TextField.scss';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import InputMask from "react-input-mask";

const TextField = (props) => {
  let { errors, placeholder, multiErrorFields, disabled, type, textarea, name, autoFocus, handleFocus, handleBlur, iconClass,
    onIconClick, onKeyDown, maskType, noTextfield, formMethod, rows, defaultValue, rules, fieldtype, index, fieldName } = props

  let values = formMethod?.getValues()
  let hasError = errors[name] !== undefined;
  let fieldArray =
    errors[fieldtype] &&
      errors[fieldtype][index] &&
      errors[fieldtype][index][fieldName] ? true : false
  return (
    <div className="textField">
      <Form.Group >
        <div className="inputBox">
          {noTextfield ?
            <Controller
              className="form-control"
              as={<InputMask />}
              mask={maskType}
              maskChar=""
              control={formMethod?.control}
              name={name}
              rules={rules}
              defaultValue={defaultValue}
              placeholder={placeholder}
              disabled={disabled}
              defaultValue={defaultValue}
              onKeyDown={onKeyDown}
              maxLength={props.maxLength}
              minLength={props.minLength}
            />
            :
            <Controller
              defaultValue={defaultValue}
              render={({ onChange }) =>
                <Form.Control className={hasError ? 'error' : ''}
                  name={name}
                  id={name}
                  autoFocus={autoFocus}
                  disabled={disabled}
                  autoFocus={autoFocus}
                  autoComplete={props.autoComplete}
                  type={type}
                  as={textarea}
                  rows={rows}
                  maxLength={props.maxLength}

                  minLength={props.minLength}
                  onBlur={(e) => handleBlur && handleBlur(e)}
                  onKeyDown={onKeyDown}
                  onFocus={(e) => { handleFocus && handleFocus(e) }}
                  onChange={(e) => {
                    // e.target.value = e.target.value.trimLeft()
                    if (e.target.validity.valid) {
                      onChange && onChange(e.target.value.trimLeft())
                      props.onChange && props.onChange(e)
                    }
                  }}
                  placeholder={placeholder}
                  value={formMethod.watch(name) || ''}
                />
              }
              name={name}
              control={formMethod?.control}
              rules={rules}
            />
          }
          <i className={formMethod.watch(name) ? "inputfill icon-css " + iconClass : `icon-css ${iconClass}`} onClick={() => values[name] && values[name] !== '' && onIconClick()}></i>
          {multiErrorFields.length > 0 ?
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ messages }) => {
                if (messages) {
                  let isMultipleError = Object.keys(messages).every((errKey) => multiErrorFields.filter((m) => m[errKey] !== undefined).length > 0)
                  if (isMultipleError) {
                    let arr = []
                    for (const fieldError of multiErrorFields) {
                      let key = Object.keys(fieldError)[0]
                      let success = Object.keys(messages).includes(key)
                      arr.push(
                        <div className={success ? 'red' : 'green'} >
                          <span key={key}>{fieldError[key]}</span>
                        </div>
                      )
                    }
                    return <div className="errorMsg show passwordcustom">{arr}</div>
                  } else {
                    return <div className='errorMsg show'>{errors[name]?.message}</div>
                  }
                } else {
                  return <div className='errorMsg'></div>
                }
              }}
            /> : (hasError ? <div className='errorMsg show'><p>{errors[name]?.message}</p></div> : fieldArray ? (
              <div className="errorMsg show">
                <p>{errors[fieldtype][index][fieldName]?.message}</p>
              </div>
            ) : <div className='errorMsg'>error</div>)}

        </div>
      </Form.Group>
    </div >
  );
}

TextField.defaultProps = {
  autoFocus: false,
  value: '',
  errors: {},
  multiErrorFields: []
}

export default TextField;
