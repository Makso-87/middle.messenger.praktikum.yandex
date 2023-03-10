import * as handlebars from "handlebars";
import template from "./chatFeed.tmpl";
import '../chatItem';

handlebars.registerPartial('chatFeed', template);

export const chatFeedTemplate = handlebars.compile(template)();
