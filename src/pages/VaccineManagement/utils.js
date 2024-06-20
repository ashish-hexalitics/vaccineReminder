export const formFields = (roleData) => [
  {
    name: "vaccineDetails",
    label: "Vaccine Details",
    type: "multiFields",
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Name",
        type: "text",
      },
      {
        name: "description",
        label: "Description",
        placeholder: "Description",
        type: "text",
      },
      {
        name: "range",
        label: "Range",
        placeholder: "Range",
        type: "text",
      },
      {
        name: "timePeriod",
        label: "Time Period",
        placeholder: "Time Period",
        type: "select",
        options: [
          { value: "Option 1", label: "Option 2" },
          { value: "Option 1", label: "Option 2" },
          { value: "Option 1", label: "Option 2" },
        ],
      },
      {
        name: "month",
        label: "Month",
        placeholder: "Month",
        type: "select",
        options: [
          { value: "Option 1", label: "Option 2" },
          { value: "Option 1", label: "Option 2" },
          { value: "Option 1", label: "Option 2" },
        ],
      },
      {
        name: "week",
        label: "Week",
        placeholder: "Week",
        type: "select",
        options: [
          { value: "Option 1", label: "Option 2" },
          { value: "Option 1", label: "Option 2" },
          { value: "Option 1", label: "Option 2" },
        ],
      },
      {
        name: "days",
        label: "Days",
        placeholder: "Days",
        type: "text",
      },
      {
        name: "isMandatory",
        label: "Is Mandatory",
        type: "checkbox",
      },
    ],
  },
];
