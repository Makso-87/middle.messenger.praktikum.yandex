import * as handlebars from "handlebars";
import template from "./avatar.tmpl";

handlebars.registerPartial('avatar', template);

export const avatarTemplate = handlebars.compile(template);
