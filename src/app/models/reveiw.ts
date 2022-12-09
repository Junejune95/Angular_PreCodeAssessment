export interface Review {
    labelName: string;
    options: string[];
    questionType: 'Paragraph' | 'Checkbox list';
    ownAnswer?: string;
    paragraph?: string;
}
