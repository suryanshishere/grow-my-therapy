"use client";

import { useId, useRef, useState } from "react";
import { contactFields, selectPlaceholder, type ContactField } from "@/content/contact";

function RequiredMark({ required }: { required: boolean }) {
  return required ? <span className="field-required"> (required)</span> : null;
}

/**
 * A faithful recreation of the reference intake form. It validates in the browser and then
 * reports that nothing was sent: there is no action, no fetch, and no storage, because this
 * clone must never collect information on behalf of the real practice.
 */
export function ContactForm() {
  const prefix = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const fieldId = (id: string) => `${prefix}-${id}`;

  const validate = (form: HTMLFormElement) => {
    const next: Record<string, string> = {};
    const check = (id: string, label: string, required: boolean) => {
      const control = form.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
      if (!control) return;
      const value = control.value.trim();
      if (required && !value) next[id] = `${label} is required.`;
      else if (control instanceof HTMLInputElement && control.type === "email" && value && !control.checkValidity()) {
        next[id] = "Enter an email address so we can reply.";
      }
    };
    for (const field of contactFields) {
      if (field.kind === "name") field.parts.forEach((part) => check(part.id, part.label, part.required));
      else check(field.id, field.label, field.required);
    }
    return next;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const next = validate(form);
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    setSent(true);
  };

  if (sent) {
    return <div className="form-notice" role="status">
      <h2>This is a demonstration form.</h2>
      <p>Nothing was sent and no information was stored. This page is a front-end study of an existing website, built for a development assignment.</p>
      <p>To contact the real practice, visit <a href="https://www.conejovalleycounseling.com/contact">conejovalleycounseling.com/contact</a>.</p>
      <button type="button" className="action-link" onClick={() => { setSent(false); formRef.current?.reset(); }}>Back to the form</button>
    </div>;
  }

  const describedBy = (field: { id: string; helper?: string }) => [
    field.helper ? `${fieldId(field.id)}-helper` : null,
    errors[field.id] ? `${fieldId(field.id)}-error` : null,
  ].filter(Boolean).join(" ") || undefined;

  const control = (field: Exclude<ContactField, { kind: "name" }>) => {
    const shared = {
      id: fieldId(field.id),
      name: field.id,
      "aria-describedby": describedBy(field),
      "aria-invalid": errors[field.id] ? true : undefined,
      className: errors[field.id] ? "is-invalid" : undefined,
    };
    if (field.kind === "select") {
      return <select {...shared} defaultValue="">
        <option value="">{selectPlaceholder}</option>
        {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>;
    }
    if (field.kind === "textarea") return <textarea {...shared} rows={3} />;
    return <input {...shared} type={field.kind} />;
  };

  return <form ref={formRef} className="contact-form" noValidate onSubmit={onSubmit} aria-label="Appointment request">
    {contactFields.map((field) => field.kind === "name"
      ? <fieldset key={field.id} className="form-field form-field--name">
          <legend className="field-label">{field.label}</legend>
          <div className="name-row">
            {field.parts.map((part) => <div key={part.id} className="name-part">
              <label className="field-label field-label--sub" htmlFor={fieldId(part.id)}>{part.label}<RequiredMark required={part.required} /></label>
              <input
                id={fieldId(part.id)}
                name={part.id}
                type="text"
                aria-describedby={errors[part.id] ? `${fieldId(part.id)}-error` : undefined}
                aria-invalid={errors[part.id] ? true : undefined}
                className={errors[part.id] ? "is-invalid" : undefined}
              />
              {errors[part.id] && <p className="field-error" id={`${fieldId(part.id)}-error`}>{errors[part.id]}</p>}
            </div>)}
          </div>
        </fieldset>
      : <div key={field.id} className="form-field">
          <label className="field-label" htmlFor={fieldId(field.id)}>{field.label}<RequiredMark required={field.required} /></label>
          {field.helper && <p className="field-helper" id={`${fieldId(field.id)}-helper`}>{field.helper}</p>}
          {control(field)}
          {errors[field.id] && <p className="field-error" id={`${fieldId(field.id)}-error`}>{errors[field.id]}</p>}
        </div>)}
    <button type="submit" className="action-link form-submit">Submit</button>
  </form>;
}
