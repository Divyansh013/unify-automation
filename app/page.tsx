import Image from "next/image";
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('running', {
    id: 'running',
    header: 'Running',
    cell: info => (
      <div className="flex items-center justify-center">
        <label className="relative inline-block w-[34px] h-5 cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={info.getValue()} readOnly />
          <div className="w-full h-full bg-[#f3efef] rounded-full peer-checked:bg-purple-600 transition duration-300"></div>
          <div className="absolute left-1 top-1 bottom-3 right-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-4"></div>
        </label>
      </div>
    )
  }),
  columnHelper.accessor('automationName', {
    id: 'automationName',
    header: 'Automation Name',
    cell: info => {
        const router = useRouter();
        return (
          <div
            className="cursor-pointer"
            onClick={() => router.push('/automations')}
          >
            {info.getValue()}
          </div>
        );
      }
  }),
  columnHelper.accessor('trigger', {
    id: 'trigger',
    header: 'Trigger',
    cell: info => (
      <div>
        <span className="ml-2 p-[5px] text-secondary bg-slate-100 border border-zinc-200 text-xs font-normal rounded-lg">{info.getValue()}</span>
      </div>
    )
  }),
  columnHelper.accessor('appsUsed', {
    id: 'appsUsed',
    header: 'Apps Used',
    cell: info => <div className="imgcontainer flex gap-2">{info.getValue().map((imageUrl, index) => (
      <img key={index} src={imageUrl} alt={`App Icon ${index + 1}`} className="w-[20px] h-[20px]" />
    ))}</div>
  }),
  columnHelper.accessor('projects', {
    id: 'projects',
    header: 'Projects'
  }),
  columnHelper.accessor('createdBy', {
    id: 'createdBy',
    header: 'Created By',
    cell: info => {
      const value = info.getValue();
      return (
        <div className="flex w-full h-full gap-2.5 items-center">
          <div>
            <span className="bg-gray-100 py-1.5 px-2.5 text-gray-500 border-0 rounded-full">{value.initial}</span>
          </div>
          <div className="flex flex-col">
            <div className="text-secondary text-sm font-light">{value.name}</div>
            <div className="text-gray-500 font-light text-xs tracking-[0.3px]">{value.time}</div>
          </div>
        </div>
      );
    }
  }),
  columnHelper.accessor('lastModifiedBy', {
    id: 'lastModifiedBy',
    header: 'Last Modified By',
    cell: info => {
      const value = info.getValue();
      return (
        <div className="flex w-full h-full gap-2.5 items-center">
          <div>
            <span className="bg-gray-100 py-1.5 px-2.5 text-gray-500 border-0 rounded-full">{value.initial}</span>
          </div>
          <div className="flex flex-col">
            <div className="text-secondary text-sm font-light">{value.name}</div>
            <div className="text-gray-500 font-light text-xs tracking-[0.3px]">{value.time}</div>
          </div>
        </div>
      );
    }
  }),
  columnHelper.accessor('empty1', {
    id: 'empty1',
    header: ''
  }),
  columnHelper.accessor('empty2', {
    id: 'empty2',
    header: ''
  })
];

const data = [
  {
    running: true,
    automationName: 'divyansh test',
    trigger: 'Schedule',
    appsUsed: ["gmail.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '16/07/24 4:30 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '16/07/24 4:35 PM'
    }
  },
  {
    running: false,
    automationName: 'project 101',
    trigger: 'Callable',
    appsUsed: ["gmail.png","slack.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: true,
    automationName: 'slack test',
    trigger: 'Callable',
    appsUsed: ["slack.png"],
    projects: '',
    createdBy: {
      name: 'Unifyapps Admin',
      initial: 'U',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: true,
    automationName: 'harsh test',
    trigger: 'Schedule',
    appsUsed: ["gmail.png","slack.png"],
    projects: '',
    createdBy: {
      name: 'Rohit',
      initial: 'R',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Rohit',
      initial: 'R',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: true,
    automationName: 'gmailtesting',
    trigger: 'Callable',
    appsUsed: ["gmail.png"],
    projects: '',
    createdBy: {
      name: 'Pulkit',
      initial: 'P',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Pulkit',
      initial: 'P',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: false,
    automationName: 'randomcheck',
    trigger: 'Callable',
    appsUsed: ["gmail.png"],
    projects: '',
    createdBy: {
      name: 'Anshveer',
      initial: 'A',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Anshveer',
      initial: 'A',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: false,
    automationName: 'xyz',
    trigger: 'Schedule',
    appsUsed: ["slack.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: true,
    automationName: 'dont edit',
    trigger: 'Schedule',
    appsUsed: ["slack.png"],
    projects: '',
    createdBy: {
      name: 'Karan',
      initial: 'K',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Karan',
      initial: 'K',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: false,
    automationName: 'latest',
    trigger: 'Callable',
    appsUsed: ["gmail.png","slack.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: false,
    automationName: 'harsh test',
    trigger: 'Schedule',
    appsUsed: ["gmail.png","slack.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: false,
    automationName: 'harsh test',
    trigger: 'Schedule',
    appsUsed: ["gmail.png","slack.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: true,
    automationName: 'harsh test',
    trigger: 'Schedule',
    appsUsed: ["gmail.png","slack.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: false,
    automationName: 'harsh test',
    trigger: 'Schedule',
    appsUsed: ["slack.png","gmail.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: true,
    automationName: 'harsh test',
    trigger: 'Schedule',
    appsUsed: ["gmail.png","slack.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: false,
    automationName: 'harsh test',
    trigger: 'Schedule',
    appsUsed: ["slack.png","gmail.png"],
    projects: '',
    createdBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Divyansh',
      initial: 'D',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: false,
    automationName: 'randomcheck',
    trigger: 'Webhook',
    appsUsed: ["gmail.png"],
    projects: '',
    createdBy: {
      name: 'Anshveer',
      initial: 'A',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Anshveer',
      initial: 'A',
      time: '10/07/24 8:40 PM'
    }
  },
  {
    running: false,
    automationName: 'randomcheck',
    trigger: 'Webhook',
    appsUsed: ["gmail.png"],
    projects: '',
    createdBy: {
      name: 'Anshveer',
      initial: 'A',
      time: '10/07/24 8:40 PM'
    },
    lastModifiedBy: {
      name: 'Anshveer',
      initial: 'A',
      time: '10/07/24 8:40 PM'
    }
  },
];



export default function Home() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return (
    <table className="border border-gray-200 rounded-t-[10px] table-fixed border-spacing-0 w-[98%] ml-[1%] mr-[1%] mt-[2%] overflow-scroll">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody id="data-table">
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className=' hover:bg-gray-100'>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
