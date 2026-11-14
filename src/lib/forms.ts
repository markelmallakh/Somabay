import { neighborhoods } from "@/content/neighborhoods";
import { type Unit, units } from "@/content/resale";

export type FormField =
  | {
      kind: "text" | "email" | "tel" | "date";
      name: string;
      label: string;
      required?: boolean;
      span?: 1 | 2;
      placeholder?: string;
      autoComplete?: string;
    }
  | { kind: "textarea"; name: string; label: string; required?: boolean; placeholder?: string }
  | {
      kind: "select";
      name: string;
      label: string;
      required?: boolean;
      span?: 1 | 2;
      placeholder: string;
      options: string[];
    }
  | {
      kind: "radio";
      name: string;
      label: string;
      required?: boolean;
      options: string[];
      columns?: 1 | 2;
    }
  | { kind: "consent"; name: string; label: string };

export type FormDefinition = {
  id: string;
  /** Human label sent with the submission so the team knows where it came from. */
  subject: string;
  submitLabel: string;
  fields: FormField[];
  /** Legal note under the submit button. */
  note?: string;
};

const firstName: FormField = {
  kind: "text",
  name: "firstName",
  label: "First name",
  required: true,
  autoComplete: "given-name",
};
const lastName: FormField = {
  kind: "text",
  name: "lastName",
  label: "Last name",
  required: true,
  autoComplete: "family-name",
};
const email: FormField = {
  kind: "email",
  name: "email",
  label: "Email",
  required: true,
  autoComplete: "email",
};
const phone: FormField = {
  kind: "tel",
  name: "phone",
  label: "Phone number",
  required: true,
  autoComplete: "tel",
};
const terms: FormField = { kind: "consent", name: "terms", label: "I accept the terms" };

/** How a listed unit reads as a choice: "Studio", "3-bedroom Villa". */
export const unitChoice = (unit: Pick<Unit, "type" | "bedrooms">) =>
  /studio/i.test(unit.type) ? unit.type : `${unit.bedrooms}-bedroom ${unit.type}`;

const NOT_SURE = "Not sure yet";

/** Unit choices for a neighborhood's interest form: its listed units, else every listed type. */
export function unitChoicesFor(neighborhood: string): string[] {
  const own = units.filter((unit) => unit.neighborhood === neighborhood);
  return [...new Set((own.length ? own : units).map(unitChoice)), NOT_SURE];
}

export const formDefinitions = {
  // Fields are shared by every neighborhood page; each page narrows the unit list to its own.
  neighborhoodInterest: {
    id: "neighborhoodInterest",
    subject: "Neighborhood interest request",
    submitLabel: "Register interest",
    note: "By submitting, you agree to our Terms & Conditions.",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      {
        kind: "select",
        name: "unit",
        label: "Preferred unit",
        required: true,
        placeholder: "Select a unit type",
        span: 2,
        options: [...new Set(units.map(unitChoice)), NOT_SURE],
      },
      {
        kind: "textarea",
        name: "message",
        label: "Message",
        placeholder: "Anything we should know? Budget, timing, questions...",
      },
      terms,
    ],
  },
  contact: {
    id: "contact",
    subject: "Website contact form",
    submitLabel: "Submit",
    note: "By submitting, you agree to our Terms & Conditions.",
    fields: [
      firstName,
      lastName,
      { ...email, span: 2 },
      {
        kind: "select",
        name: "purpose",
        label: "Inquiry purpose",
        required: true,
        placeholder: "Select purpose",
        options: [
          "Sales",
          "Holidays",
          "Residents & services",
          "Events",
          "Media",
          "Careers",
          "Other",
        ],
      },
      {
        kind: "select",
        name: "interest",
        label: "Interested in",
        placeholder: "Select neighborhood",
        options: neighborhoods.map((item) => item.name),
      },
      {
        kind: "textarea",
        name: "message",
        label: "Message",
        required: true,
        placeholder: "Tell us about your interest...",
      },
    ],
  },
  spa: {
    id: "spa",
    subject: "Spa & Thalasso booking request",
    submitLabel: "Submit",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      {
        kind: "select",
        name: "treatment",
        label: "Choose a type",
        required: true,
        placeholder: "Select type",
        options: [
          "Massages",
          "Slimming",
          "Body Scrubs",
          "Body Wraps",
          "Specialized Beauty Treatment",
          "Facials",
        ],
      },
      { kind: "date", name: "date", label: "Choose date" },
      {
        // A dropdown rather than six radios, to keep the booking form compact.
        kind: "select",
        name: "guestType",
        label: "Which best describes you?",
        placeholder: "Select one",
        span: 2,
        options: ["Hotel guest", "Homeowner", "Day visitor", "Group booking", "Member", "Other"],
      },
      { kind: "textarea", name: "message", label: "Message", placeholder: "Type your message..." },
      terms,
    ],
  },
  watersports: {
    id: "watersports",
    subject: "Watersports & Diving booking request",
    submitLabel: "Submit",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      {
        kind: "select",
        name: "activity",
        label: "Choose an activity",
        required: true,
        placeholder: "Select",
        options: [
          "Diving with Orca Diving Center",
          "Snorkeling at the Jetty",
          "Boat trip",
          "Kitesurfing at 7BFT Kite House",
        ],
      },
      { kind: "date", name: "date", label: "Preferred date" },
      { kind: "textarea", name: "message", label: "Message" },
      terms,
    ],
  },
  adventure: {
    id: "adventure",
    subject: "Beaches & Adventure booking request",
    submitLabel: "Submit",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      {
        kind: "select",
        name: "activity",
        label: "Choose an activity",
        required: true,
        placeholder: "Select",
        options: [
          "Day at S.Cape Beach",
          "Desert safari or quad biking",
          "Horse riding with Jasmine Stable",
          "Golf cart, bike or scooter rental",
        ],
      },
      { kind: "date", name: "date", label: "Preferred date" },
      { kind: "textarea", name: "message", label: "Message" },
      terms,
    ],
  },
  playpark: {
    id: "playpark",
    subject: "Playpark booking request",
    submitLabel: "Submit",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      {
        kind: "select",
        name: "activity",
        label: "Choose an activity",
        required: true,
        placeholder: "Select",
        options: ["Soma Splash aqua park", "Soma Raceway go-karting", "Footgolf", "Paintball"],
      },
      { kind: "date", name: "date", label: "Preferred date" },
      { kind: "textarea", name: "message", label: "Message" },
      terms,
    ],
  },
  sports: {
    id: "sports",
    subject: "Sports booking request",
    submitLabel: "Submit",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      {
        kind: "select",
        name: "activity",
        label: "Choose a sport",
        required: true,
        placeholder: "Select",
        options: [
          "Padel tennis",
          "Squash",
          "Tennis",
          "Bayfit class",
          "Kitesurfing",
          "Horse riding",
        ],
      },
      { kind: "date", name: "date", label: "Preferred date" },
      { kind: "textarea", name: "message", label: "Message" },
      terms,
    ],
  },
  coworking: {
    id: "coworking",
    subject: "Coworking booking request",
    submitLabel: "Submit",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      {
        kind: "select",
        name: "activity",
        label: "Choose a pass",
        required: true,
        placeholder: "Select",
        options: ["Day pass", "Weekly pass", "Monthly pass", "Meeting room"],
      },
      { kind: "date", name: "date", label: "Preferred date" },
      { kind: "textarea", name: "message", label: "Message" },
      terms,
    ],
  },
  tee: {
    id: "tee",
    subject: "Tee time booking request",
    submitLabel: "Submit",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      { kind: "date", name: "date", label: "Choose date", required: true },
      {
        kind: "select",
        name: "slot",
        label: "Choose time slot",
        required: true,
        placeholder: "Select time slot",
        options: [
          "Morning (7:00 – 10:00)",
          "Midday (10:00 – 13:00)",
          "Afternoon (13:00 – 16:00)",
          "Twilight (16:00 – sunset)",
        ],
      },
      { kind: "textarea", name: "message", label: "Message", placeholder: "Type your message..." },
      terms,
    ],
  },
  unit: {
    id: "unit",
    subject: "Resale unit call request",
    submitLabel: "Request call now",
    fields: [
      firstName,
      lastName,
      { ...phone, span: 2 },
      { ...email, span: 2 },
      {
        kind: "radio",
        name: "contactBy",
        label: "How would you like us to contact you?",
        options: ["Email", "Phone number"],
        required: true,
      },
    ],
  },
} satisfies Record<string, FormDefinition>;

export type FormId = keyof typeof formDefinitions;

export function isFormId(value: string): value is FormId {
  return value in formDefinitions;
}
