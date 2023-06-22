import { NextFunction, Request, Response } from 'express';
import { errorFactory } from '@/utils';

const validateConflictCategoriesMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { name } = request.body;
  if (!name) throw errorFactory.unprocessableEntity(['name inexistent']);

  const isRegisteredCategories = await categoriesRepository.getCategoriesByFilterName(name);
  console.log(isRegisteredCategories);

  if (isRegisteredCategories.length > 0) throw errorFactory.conflict('Categories');

  response.locals.product = isRegisteredCategories;

  next();
};
const validateNotFoundCategoriesMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;

  const isRegisteredCategories = await categoriesRepository.getCategoriesById(Number(id));

  if (!isRegisteredCategories) throw errorFactory.notFound('Categories');

  response.locals.product = isRegisteredCategories;

  next();
};

export { validateConflictCategoriesMiddleware, validateNotFoundCategoriesMiddleware };
