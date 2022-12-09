export interface Question {
    isAllowOwnAns: boolean;
    isRequiredField: boolean;
    labelName: string;
    options: string[];
    questionType: 'Paragraph' | 'Checkbox list';
    ownAnswer?: string;
}
