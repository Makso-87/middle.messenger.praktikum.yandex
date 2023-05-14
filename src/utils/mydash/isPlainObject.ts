export type PlainObject = Record<string, unknown>;

export const isPlainObject = (value: unknown | null): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
