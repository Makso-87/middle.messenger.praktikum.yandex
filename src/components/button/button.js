import * as handlebars from "handlebars";
import template from "./button.tmpl";
handlebars.registerPartial('button', template);
export const buttonTemplate = handlebars.compile(template)();
