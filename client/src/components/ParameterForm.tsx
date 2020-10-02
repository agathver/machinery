import React from "react";
import {Parameters} from "../client";

type ParametersProps = {
    parameters: Parameters[]
}

export default function ParameterForm({parameters}: ParametersProps) {
    return (<form>
            {parameters.map(parameter => (
                <div className="field" key={parameter.id}>
                    <label className="label">{parameter.name}</label>
                    <div className="control">
                        <input name={parameter.id} className="input" type="text" placeholder="Text input"/>
                    </div>
                    <p className="help">{parameter.description}</p>
                </div>
            ))}
        </form>
    );
}
