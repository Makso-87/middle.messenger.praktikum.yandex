import * as handlebars from "handlebars";
import template from "./messageFeed.tmpl";

handlebars.registerPartial('messageFeed', template);

export const messageFeedTemplate = handlebars.compile(template)();
