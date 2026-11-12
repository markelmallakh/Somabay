"use client";

import { useActionState, useId } from "react";
import { type EnquiryState, submitEnquiry } from "@/lib/actions/enquiry";
import type { FormDefinition, FormField } from "@/lib/forms";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";

type EnquiryFormProps = {
  /** Passed from a Server Component so field data stays out of the client bundle. */
  definition: FormDefinition;
  /** Extra context sent with the request, e.g. the unit or event name. */
  context?: string;
  className?: string;
};

const initialState: EnquiryState = { status: "idle", message: "" };

export function EnquiryForm({ definition, context, className }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const baseId = useId();
  const errors = state.fieldErrors ?? {};
  const fieldId = (name: string) => `${baseId}-${name}`;

  if (state.status === "success") {
    return (
      <div
        role="status"
        className={cn("flex flex-col items-start gap-4 rounded-card bg-turquoise-5 p-8", className)}
      >
        <span className="grid size-12 place-items-center rounded-full bg-turquoise text-white">
          <Icon name="check" className="size-6" />
        </span>
        <p className="font-serif text-h3">Request received</p>
        <p className="text-slate">{state.message}</p>
      </div>
    );
  }

  const renderField = (field: FormField) => {
    const id = fieldId(field.name);
    const error = errors[field.name];
    switch (field.kind) {
      case "textarea":
        return (
          <TextAreaField
            key={field.name}
            id={id}
            name={field.name}
            label={field.label}
            required={field.required}
            placeholder={field.placeholder}
            error={error}
            className="sm:col-span-2"
          />
        );
      case "select":
        return (
          <SelectField
            key={field.name}
            id={id}
            name={field.name}
            label={field.label}
            required={field.required}
            placeholder={field.placeholder}
            options={field.options}
            error={error}
            className={cn(field.span === 2 && "sm:col-span-2")}
          />
        );
      case "radio":
        return (
          <fieldset
            key={field.name}
            className="sm:col-span-2"
            aria-describedby={error ? `${id}-error` : undefined}
          >
            <legend className="eyebrow mb-4 text-[0.6875rem] text-slate">
              {field.label}
              {field.required ? <span aria-hidden> *</span> : null}
            </legend>
            <div
              className={cn(
                "grid gap-3",
                field.columns === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2",
              )}
            >
              {field.options.map((option, index) => (
                <label
                  key={option}
                  className="group flex cursor-pointer items-center gap-3 text-[0.9375rem]"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={option}
                    required={field.required && index === 0}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className="grid size-5 place-items-center rounded-full border border-ink/30 transition-colors group-hover:border-ink peer-checked:border-turquoise peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turquoise peer-checked:[&>span]:scale-100"
                  >
                    <span className="size-2.5 scale-0 rounded-full bg-turquoise transition-transform duration-300" />
                  </span>
                  {option}
                </label>
              ))}
            </div>
            {error ? (
              <p id={`${id}-error`} className="mt-2 text-caption text-alert">
                {error}
              </p>
            ) : null}
          </fieldset>
        );
      case "consent":
        return (
          <div key={field.name} className="sm:col-span-2">
            <label
              htmlFor={id}
              className="group flex cursor-pointer items-center gap-3 text-[0.9375rem]"
            >
              <input
                id={id}
                type="checkbox"
                name={field.name}
                required
                className="peer sr-only"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
              />
              <span
                aria-hidden
                className="grid size-5 place-items-center rounded-[0.375rem] border border-ink/30 text-white transition-colors group-hover:border-ink peer-checked:border-turquoise peer-checked:bg-turquoise peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turquoise"
              >
                <Icon name="check" className="size-3.5" />
              </span>
              {field.label}
            </label>
            {error ? (
              <p id={`${id}-error`} className="mt-2 text-caption text-alert">
                {error}
              </p>
            ) : null}
          </div>
        );
      default:
        return (
          <TextField
            key={field.name}
            id={id}
            name={field.name}
            type={field.kind}
            label={field.label}
            required={field.required}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            error={error}
            className={cn(field.span === 2 && "sm:col-span-2")}
          />
        );
    }
  };

  return (
    <form
      action={formAction}
      noValidate
      className={cn("grid gap-x-5 gap-y-6 sm:grid-cols-2", className)}
    >
      <input type="hidden" name="formId" value={definition.id} />
      {context ? <input type="hidden" name="context" value={context} /> : null}
      {definition.fields.map(renderField)}
      <div className="flex flex-col gap-4 sm:col-span-2">
        {state.status === "error" ? (
          <p role="alert" className="text-caption text-alert">
            {state.message}
          </p>
        ) : null}
        {/* A wide submit, set to the right edge of the form. */}
        <div className="flex justify-end">
          <Button type="submit" variant="solid" disabled={pending} className="min-w-52">
            {pending ? "Sending…" : definition.submitLabel}
          </Button>
        </div>
        {definition.note ? <p className="text-caption text-slate">{definition.note}</p> : null}
      </div>
    </form>
  );
}
