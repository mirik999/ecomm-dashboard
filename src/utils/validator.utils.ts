import { AnySchema } from 'yup';
import { CustomErrorType } from '../redux/types/common.type';

async function validator<T, P extends AnySchema>(
  state: T,
  schema: P,
): Promise<{ isValid: boolean; errorObject: CustomErrorType }> {
  let isValid = false;
  let errorObject: CustomErrorType = {};
  try {
    isValid = await schema.validate(state, {
      abortEarly: false,
    });
  } catch (err) {
    err.inner.forEach((e: any) => {
      errorObject[e.path] = {
        type: e.type,
        message: e.message,
      };
    });
  }
  return {
    isValid,
    errorObject,
  };
}

export default validator;
