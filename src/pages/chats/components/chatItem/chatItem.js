import * as handlebars from "handlebars";
import template from './chatItem.tmpl';

handlebars.registerPartial('chatItem', template);

export const chatItemTemplate = handlebars.compile(template)();
