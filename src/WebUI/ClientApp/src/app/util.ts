// fixes "" -> null, doesn't touch the value otherwise
export function fixNonEmptyString(s: any): any {
  if (typeof s === 'string' && !s) {
    return null;
  } else {
    return s;
  }
}

// iterates over the object and fixes "" -> null for all members
export function fixNonEmptyStringAll(form: any): any {
  return Object.fromEntries(
    Object.entries(form).map(([k, v]) => [k, fixNonEmptyString(v)])
  );
}
