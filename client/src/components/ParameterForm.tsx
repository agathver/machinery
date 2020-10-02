import React, {useState} from "react";
import {Parameter, ParameterValues} from "../client";


type SubmitHandler = (_: ParameterValues) => void

type ParametersProps = {
    parameters?: Parameter[]
    onSubmit?: SubmitHandler
}

function doTypeCast(value: string, type: string) {
    switch (type) {
        case 'number':
            return parseInt(value, 10)
        case 'string':
        default:
            return value
    }
}

function renderParameter(parameter: Parameter, value: ParameterValues, setValue: (value: (((prevState: {}) => {}) | {})) => void) {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setValue((previous) => ({...previous, [name]: doTypeCast(value, parameter.type)}))
    }

    switch (parameter.type) {
        case 'choice':
            return (
                <div className="control">
                    <div className="select">
                        <select name={parameter.id} value={value[parameter.id].toString()} onChange={handleOnChange}>
                            {parameter.choices.map(choice => (
                                <option key={choice.value} value={choice.value}>{choice.name}</option>
                            ))}
                        </select>
                    </div>
                </div>);
        case 'string':
        default:
            return (
                <div className="control">
                    <input onChange={handleOnChange} value={value[parameter.id].toString()} name={parameter.id}
                           className="input" type="text"
                           pattern={parameter.pattern || undefined}/>
                </div>);

    }
}


function defaultValue(param: Parameter) {
    if (param.default) {
        return param.default;
    }

    switch (param.type) {
        case 'choice':
            return param.choices.length && param.choices[0].value;
        case 'number':
            return 0;
        case 'string':
        default:
            return '';
    }
}

function initialState(parameters: Parameter[] | undefined) {
    if (!parameters) {
        return {}
    }

    const state: ParameterValues = {};

    for (const param of parameters) {
        state[param.id] = defaultValue(param)
    }

    return state
}

export default function ParameterForm({parameters, onSubmit}: ParametersProps) {

    const [value, setValue] = useState(initialState(parameters))

    function handleOnSubmit(handler: SubmitHandler | undefined) {
        return (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (handler) {
                handler(value);
            }
        };
    }

    return (<form onSubmit={handleOnSubmit(onSubmit)}>
            {parameters && (
                parameters.length > 0 ? (parameters.map(parameter => (
                        <div className="field" key={parameter.id}>
                            <label className="label">{parameter.name}</label>
                            {renderParameter(parameter, value, setValue)}
                            <p className="help">{parameter.description}</p>
                        </div>)))
                    : (<div className="message">
                        <p className="message-body">This task has no parameters</p>
                    </div>))}
            <div className="field">
                <div className="control">
                    <div className="control">
                        <button type="submit" className="button is-success">Execute</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
