import * as handlebars from "handlebars";
import '../input';
import '../button';
import template from './form.tmpl';

handlebars.registerPartial('form', template);
export const formTemplate = handlebars.compile(template)();
