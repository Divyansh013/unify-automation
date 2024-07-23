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
    "attachment"
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
      "description": "Select Spreadsheet",
      "enum": ["Spreadsheet1", "Spreadsheet2", "Spreadsheet3"]
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
      "title": "Select a Date",
      "description": "Select a Date"
    },
    "value": {
      "type": "integer",
      "title": "Batch Size",
      "description": "Enter size of batch"
    }
  }
};
const CustomFieldTemplate = (props) => {
  console.log("props", props);
  return (
    <div className="my-[14px] w-[460px]">
      <div className="text-[.875rem] text-[#475467] tracking-wide">
        {  props.required ?  props.label+"*" : props.label }
      </div>
      <div className="my-[5px] w-[100%]">
        <div className="border border-solid  border-[#CFD4DE] flex rounded-[4px] pb-[4px] w-[97%]">
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

const CustomSelectFieldTemplate = (props) => {
  console.log("props", props);
  return (
    <div className="my-[14px] w-[460px]">
      <div className="text-[.875rem] text-[#475467] tracking-wide">
        {props.required ? props.label + "*" : props.label}
      </div>
      <div className="my-[5px] w-[100%]">
        <div className="border border-solid border-[#CFD4DE] flex rounded-[4px] pb-[4px] w-[97%]">
          <div className="w-[100%] ml-[4%]">
            <select
              className="w-[100%] focus:outline-none text-[.75rem] h-[36px]"
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
  }
};



export default function FormPage() {
  return (
    <Form
      className="flex items-center flex-col mt-10"
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      FieldTemplate={{CustomFieldTemplate,
       CustomSelectFieldTemplate,
        CustomDateTemplate,
          CustomIntTemplate
      }
      }
    />
  );
}
