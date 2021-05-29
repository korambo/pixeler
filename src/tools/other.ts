/**
 *
 *
 * @param obj
 * @param defaultObj
 */
export const objectOrBool = <T>(obj: Partial<T> | boolean | undefined, defaultObj: T): T => {
  const keys = Object.keys(defaultObj);
  const res = {} as T;

  if (typeof obj === 'boolean') {
    keys.forEach((key) => { res[key] = obj; });

    return res;
  }

  return { ...defaultObj, ...obj };
};
