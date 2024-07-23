'use client'
import React from 'react';
import { useState } from 'react';
import Form from '@rjsf/core';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import '../../app/globals.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const schema: RJSFSchema = {
  "title": "",
  "description": "",
  "type": "object",
  "required": [
    "message",
    "attachment",
    "metadata",
    "record"
  ],
  "properties": {
    "message": {
      "type": "string",
      "title": "Message Id",
      "description": "Message Id"
    },
    "attachment": {
      "type": "string",
      "title": "Attachment Id",
      "description": "Attachment Id"
    },
    "spreadsheet": {
      "type": "string",
      "title": "Select Spreadsheet",
      "description": "Select Spreadsheet to add row",
      "enum": ["Old", "Sheet 2", "New"]
    },
    "sheet": {
      "type": "string",
      "title": "Select Sheet",
      "description": "Select Spreadsheet",
      "enum": ["Sheet1", "Sheet2", "Sheet3"]
    },
    "date": {
      "type": "string",
      "format": "date",
      "title": "From",
      "description": "Fetch new object after specified date and time."
    },
    "value": {
      "type": "integer",
      "title": "Batch Size",
      "description": "Enter size of batch"
    },
    "record": {
      "type": "string",
      "title": "Number of Records to fetch",
      "enum": ["Single", "Multiple"]
    },
    "metadata": {
      type: "object",
      title: "Search object",
      "properties": {
        "url": {
          type: "string",
          title: "Field"
        },
        "date": {
          type: "string",
          title: "Value"
        },
      },
      "required": ["url", "date"]
    }
  }
};

const CustomRadioTemplate = (props) => {
  const isChecked = (value) => props.value === value;

  return (
    <div className="my-[14px] w-[460px]">
      <div className="text-[.875rem] text-[#475467] tracking-wide">
        {props.required ? props.label + "*" : props.label}
      </div>
      <div className="my-[5px] w-[100%]">
        <div className="flex items-center space-x-8">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name={props.idSchema ? props.idSchema.$id : ''}
              value="Single"
              checked={isChecked("Single")}
              onChange={(e) => props.onChange(e.target.value)}
              className={`w-6 h-6 cursor-pointer appearance-none border-2 border-gray-300 rounded-full checked:bg-blue-500`}
            />
            <span className="text-[1rem]">Single</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name={props.idSchema ? props.idSchema.$id : ''}
              value="Multiple"
              checked={isChecked("Multiple")}
              onChange={(e) => props.onChange(e.target.value)}
              className={`w-6 h-6 cursor-pointer appearance-none border-2 border-gray-300 rounded-full checked:bg-blue-500`}
            />
            <span className="text-[1rem]">Multiple</span>
          </label>
        </div>
        <div className="text-[.75rem] text-[#475467] font-light mt-[7px] w-[92%]">
          {props.rawDescription}
        </div>
      </div>
    </div>
  );
};


const CustomFieldTemplate = (props) => {
  console.log("props", props);
  return (
    <div className="my-[14px] w-[460px]">
      <div className="text-[.875rem] text-[#475467] tracking-wide">
        {  props.required ?  props.label+"*" : props.label }
      </div>
      <div className="my-[5px] w-[100%]">
        <div className="border border-solid  border-[#CFD4DE] flex rounded-[4px] pb-[4px] w-[97%] focus-within:outline focus-within:outline-2 focus-within:outline-indigo-500">
          <div className="w-[8%] flex flex-row items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              width="100%"
              height="100%"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C5.602 4 6.068 4 7 4h10c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C20 5.602 20 6.068 20 7M9 20h6M12 4v16"
              ></path>
            </svg>
          </div>
          <div className="w-[89%]">
            <input
              type="text"
              className="w-[100%] focus:outline-none text-lg text-[#475467] h-[36px]" />
          </div>
        </div>
        <div className="text-[.75rem] text-[#475467] font-light mt-[7px] w-[92%]">
          {props.rawDescription}
        </div>
      </div>
    </div>
  );
};

const CustomSelectFieldTemplate = (props) => {
  console.log("props", props);
  return (
    <div className="my-[14px] w-[460px]">
      <div className="text-[.875rem] text-[#475467] tracking-wide">
        {props.required ? props.label + "*" : props.label}
      </div>
      <div className="my-[5px] w-[100%]">
        <div className="border border-solid border-[#CFD4DE] flex rounded-[4px] w-[97%] focus-within:outline focus-within:outline-2 focus-within:outline-indigo-500">
          <div className="w-[100%] ml-[4%]">
            <select
              className="w-[100%] focus:outline-none text-lg text-[#475467] h-[36px]"
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
            >
              {props.schema.enum.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-[.75rem] text-[#475467] font-light mt-[7px] w-[92%]">
          {props.rawDescription}
        </div>
      </div>
    </div>
  );
};

const CustomDateTemplate = (props) => {
  const [startDate, setStartDate] = useState(null);
  const handleChange = (date) => {
    setStartDate(date);
    props.onChange(date);
  };

  return (
    <div className="my-[14px] w-[460px]">
      <div className="text-[.875rem] text-[#475467] tracking-wide">
        {props.required ? props.label + "*" : props.label}
      </div>
      <div className="my-[5px] w-[100%]">
        <div className="border border-solid border-[#CFD4DE] flex rounded-[4px] pb-[4px] w-[97%]">
          <div className="w-[100%] ml-[4%]">
            <DatePicker
              className="w-[100%] focus:outline-none text-[.75rem] h-[36px]"
              selected={startDate}
              onChange={handleChange}
              placeholderText="Select a Date"
            />
          </div>
        </div>
        <div className="text-[.75rem] text-[#475467] font-light mt-[7px] w-[92%]">
          {props.rawDescription}
        </div>
      </div>
    </div>
  );
};

const CustomIntTemplate = (props) => {
  console.log("props", props);
  return (
    <div className="my-[14px] w-[460px]">
      <div className="text-[.875rem] text-[#475467] tracking-wide">
        {  props.required ?  props.label+"*" : props.label }
      </div>
      <div className="my-[5px] w-[100%]">
        <div className="border border-solid  border-[#CFD4DE] flex rounded-[4px] pb-[4px] w-[97%]">
          <div className="w-[100%] ml-[5%]">
            <input
              type="number"
              className="w-[100%] focus:outline-none text-[.75rem] h-[36px]" />
          </div>
        </div>
        <div className="text-[.75rem] text-[#475467] font-light mt-[7px] w-[92%]">
          {props.rawDescription}
        </div>
      </div>
    </div>
  );
};

function CustomMetaDataField(props: FieldProps) {
  const { id, schema, required, disabled, readonly, onChange, value, onBlur, onFocus, idSchema } = props;
  return (
    <div className='flex flex-col mt-4 mb-4'>
      <label htmlFor={props.idSchema ? props.idSchema.$id : ''} className='text-secondary font-medium text-sm items-center flex tracking-wide'>
        {schema.title}{required ? "*" : null}
      </label>
      <div className='text-xs text-tertiary mb-2'>
        {schema.description}
      </div>
      <div className='text-primary text-sm border border-solid border-primary bg-[#6670850d] rounded-md p-4 gap-2'>
        <div className='flex flex-col'>
          <label htmlFor={props.idSchema ? props.idSchema.$id : ''} className='text-secondary font-medium text-sm items-center flex mb-2 tracking-wide'>
            {schema.properties.url.title}{required ? "*" : null}
          </label>
          <div className="flex items-center gap-2 text-primary text-sm border-primary bg-[#6670850d] rounded-md px-4 h-8 border focus-within:outline focus-within:outline-2 focus-within:outline-indigo-500 font-[350]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" width="100%" height="100%" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C5.602 4 6.068 4 7 4h10c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C20 5.602 20 6.068 20 7M9 20h6M12 4v16"></path>
            </svg>
            <input
              className="w-full h-full outline-none bg-transparent text-primary"
              id={props.idSchema ? props.idSchema.$id : ''}
              name={props.name}
              required={required}
              disabled={disabled || readonly}
              value={value}
              onChange={(event) => props.onChange(event.target.value)}
              onBlur={onBlur && ((event) => onBlur(idSchema.$id, event.target.value))}
              onFocus={onFocus && ((event) => onFocus(idSchema.$id, event.target.value))}
            >
            </input>
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor={props.idSchema ? props.idSchema.$id : ''} className='text-secondary font-medium text-sm mt-2 items-center flex mb-2 tracking-wide'>
              {schema.properties.date.title}{required ? "*" : null}
          </label>
          <div className="flex items-center gap-2 text-primary text-sm border-primary bg-[#6670850d] rounded-md px-4 h-8 border focus-within:outline focus-within:outline-2 focus-within:outline-indigo-500 font-[350]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" width="100%" height="100%" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C5.602 4 6.068 4 7 4h10c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C20 5.602 20 6.068 20 7M9 20h6M12 4v16"></path>
            </svg>
            <input
              className="w-full h-full outline-none bg-transparent text-primary"
              id={props.idSchema ? props.idSchema.$id : ''}
              name={props.name}
              required={required}
              disabled={disabled || readonly}
              value={value}
              onChange={(event) => props.onChange(event.target.value)}
              onBlur={onBlur && ((event) => onBlur(idSchema.$id, event.target.value))}
              onFocus={onFocus && ((event) => onFocus(idSchema.$id, event.target.value))}
            >
            </input>
          </div>
        </div>
      </div>
    </div>
  );
}


const uiSchema: UiSchema = {
  "message": {
    "ui:FieldTemplate": CustomFieldTemplate
  },
  "attachment": {
   "ui:FieldTemplate": CustomFieldTemplate
  },
  "spreadsheet": {
    "ui:FieldTemplate": CustomSelectFieldTemplate
  },
  "sheet": {
    "ui:FieldTemplate": CustomSelectFieldTemplate
  },
  "date": {
    "ui:FieldTemplate": CustomDateTemplate
  },
  "value": {
    "ui:FieldTemplate": CustomIntTemplate
  },
  "record": {
    "ui:widget": "radio",
    "ui:FieldTemplate": CustomRadioTemplate
  },
  "metadata": {
    "ui:FieldTemplate": CustomMetaDataField
  }
};



export default function FormPage() {
  return (
    <Form
    children={true}
      className="flex items-center flex-col mt-10"
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      FieldTemplate={{CustomFieldTemplate,
       CustomSelectFieldTemplate,
        CustomDateTemplate,
        CustomIntTemplate,
        CustomRadioTemplate,
        CustomMetaDataField
      }
      }
    />
  );
}
