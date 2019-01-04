import {FormCreator} from "./form_creator"
import {Question} from "./question"

export class Form {
    _id: String;
    name: string;
    questions: Array<Question>;
    form_creator:  FormCreator;
    creation_time: Date;
    active_status: Boolean;
    html_body: String 
}
