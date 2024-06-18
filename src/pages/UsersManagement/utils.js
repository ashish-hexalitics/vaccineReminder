export const formFields = (roles, vaccineTemplates, roleName) => {
  const common = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
    },
    {
      name: "date_of_birth",
      label: "Date of Birth",
      type: "date",
    },
    {
      name: "mobile_number",
      label: "Mobile Number",
      type: "tel",
      placeholder: "Enter mobile number",
    },
    {
      name: "role_id",
      label: "Role",
      type: "select",
      placeholder: "Select role",
      options: roles.map((role) => ({ label: role.role_name, value: role.id })).filter((role) => role.label !== roleName),
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
    },
  ];
  const VaccineTemplates = [
    {
      name: "vaccinetemplates",
      label: "Vaccine Templates",
      placeholder: "Select The Templates",
      type: "multi-select",
      options: vaccineTemplates.map((vaccineTemplate) => ({
        label: vaccineTemplate.name,
        value: vaccineTemplate.id,
      })),
    },
  ];
  switch (roleName) {
    case "Superadmin":
      return [...common];
      break;
    case "Admin":
      return [...common, ...VaccineTemplates];
      break;
    case "Doctor":
      return [...common, ...VaccineTemplates];
      break;
    case "Staff":
      return [...common, ...VaccineTemplates];
      break;
    default:
      return [...common];
      break;
  }
};
