import * as handlebars from "handlebars";
import template from './input.tmpl';

handlebars.registerPartial('input', template);
export const inputTemplate = handlebars.compile(template)();
