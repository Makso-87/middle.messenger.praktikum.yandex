import * as handlebars from "handlebars";
import template from "./profileDataItem.tmpl";

handlebars.registerPartial('profileDataItem', template);

export const profileDataItemTemplate = handlebars.compile(template);
