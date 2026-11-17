import { activityDetails } from "@/content/things-to-do";
import { hotels } from "@/content/hotels";
import { neighborhoods } from "@/content/neighborhoods";
import { type Unit, units } from "@/content/resale";

/** Show (and require) a field only when another field holds one of these values. */
export type ShowWhen = { field: string; values: string[] };

export type FormField = (
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
      /** `chips`: the choices as rounded sun-yellow chips, like the site's filters. */
      display?: "chips";
    }
  | { kind: "consent"; name: string; label: string }
  | {
      /** A document upload, e.g. a CV. */
      kind: "file";
      name: string;
      label: string;
      required?: boolean;
      /** File types the picker offers, as extensions: ".pdf,.doc,.docx". */
      accept: string;
      /** Largest file accepted, in megabytes. */
      maxMb: number;
      hint?: string;
    }
) & { showWhen?: ShowWhen };

/** Whether a field applies, given the values chosen so far. */
export const fieldShown = (field: FormField, read: (name: string) => string) =>
  !field.showWhen || field.showWhen.values.includes(read(field.showWhen.field));

export type FormDefinition = {
  id: string;
  /** Human label sent with the submission so the team knows where it came from. */
  subject: string;
  submitLabel: string;
  fields: FormField[];
  /** Legal note under the submit button. */
  note?: string;
  /** What the visitor reads once the request is sent. */
  successMessage?: string;
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

/** How a listed unit reads as a choice: "Studio", "3-bedroom Villa". */
export const unitChoice = (unit: Pick<Unit, "type" | "bedrooms">) =>
  /studio/i.test(unit.type) ? unit.type : `${unit.bedrooms}-bedroom ${unit.type}`;

const NOT_SURE = "Not sure yet";

/** The contact purposes that bring their own follow-up questions. */
export const CONTACT_PURPOSE = {
  hotel: "Hotel Stay",
  living: "Living in Somabay",
  thingsToDo: "Things to Do",
  general: "General Inquiry",
} as const;

/** Unit choices for a neighborhood's interest form: its listed units, else every listed type. */
export function unitChoicesFor(neighborhood: string): string[] {
  const own = units.filter((unit) => unit.neighborhood === neighborhood);
  return [...new Set((own.length ? own : units).map(unitChoice)), NOT_SURE];
}

export const formDefinitions = {
  // Every vacancy uses this form; the page sends the role's title as the context.
  jobApplication: {
    id: "jobApplication",
    subject: "Job application",
    submitLabel: "Submit application",
    successMessage:
      "Thank you for applying. Our team will review your application and get in touch with you soon.",
    note: "By submitting, you agree to our Terms & Conditions.",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      {
        kind: "text",
        name: "linkedin",
        label: "LinkedIn or portfolio link",
        span: 2,
        autoComplete: "url",
      },
      {
        kind: "file",
        name: "cv",
        label: "Attach your CV",
        required: true,
        accept: ".pdf,.doc,.docx",
        maxMb: 5,
        hint: "PDF or Word, up to 5 MB",
      },
      {
        kind: "textarea",
        name: "message",
        label: "Cover note",
        placeholder: "Tell us a little about yourself",
      },
    ],
  },
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
    ],
  },
  // The follow-up questions change with the purpose: a hotel, a neighborhood, or an activity
  // and its date. Only the questions shown are sent and checked.
  contact: {
    id: "contact",
    subject: "Website contact form",
    submitLabel: "Send message",
    note: "By submitting, you agree to our Terms & Conditions.",
    successMessage: "Thank you. Our team will get in touch with you soon.",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      {
        kind: "radio",
        name: "purpose",
        label: "Inquiry purpose",
        required: true,
        display: "chips",
        options: [
          CONTACT_PURPOSE.hotel,
          CONTACT_PURPOSE.living,
          CONTACT_PURPOSE.thingsToDo,
          CONTACT_PURPOSE.general,
        ],
      },
      {
        kind: "select",
        name: "hotel",
        label: "Interested in",
        required: true,
        span: 2,
        placeholder: "Select a hotel",
        options: [...hotels.map((hotel) => hotel.name), NOT_SURE],
        showWhen: { field: "purpose", values: [CONTACT_PURPOSE.hotel] },
      },
      {
        kind: "select",
        name: "neighborhood",
        label: "Interested in",
        required: true,
        span: 2,
        placeholder: "Select a neighborhood",
        options: [...neighborhoods.map((item) => item.name), NOT_SURE],
        showWhen: { field: "purpose", values: [CONTACT_PURPOSE.living] },
      },
      {
        kind: "select",
        name: "activity",
        label: "Activity",
        required: true,
        placeholder: "Select an activity",
        options: [
          "Golf",
          ...activityDetails.map((activity) => activity.title),
          "Sports",
          "Something else",
        ],
        showWhen: { field: "purpose", values: [CONTACT_PURPOSE.thingsToDo] },
      },
      {
        kind: "date",
        name: "date",
        label: "Preferred date",
        required: true,
        showWhen: { field: "purpose", values: [CONTACT_PURPOSE.thingsToDo] },
      },
      {
        kind: "textarea",
        name: "message",
        label: "Message",
        required: true,
        placeholder: "Tell us how we can help...",
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
    ],
  },
  // The Marina's "Book a boat trip" drawer: the watersports form without the activity choice.
  boatTrip: {
    id: "boatTrip",
    subject: "Marina boat trip booking request",
    submitLabel: "Submit",
    fields: [
      firstName,
      lastName,
      email,
      phone,
      { kind: "date", name: "date", label: "Preferred date", span: 2 },
      { kind: "textarea", name: "message", label: "Message" },
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
