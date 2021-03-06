```typescript
interface Form {  // 'body' of Form
  questions: Question[];
}

interface Question { // abstract
  id: int;

  title: string;
  images: int[];  // For use in image src url, length <= 5

  conds: Condition[];
  cond_or: boolean;  // true for 'or', false for 'and'

  // Marks the derived type
  type: 'input' | 'text' | 'radio' | 'checkbox' |
        'dropdown' | 'file' | 'date' | 'datetime' |
        'comment';
  // TBD: 'time' | 'geo' | 'fuzzy_geo' | 'ip' | 'stack'
}

interface InputQuestion extends Question {
  min_length?: int | null;
  max_length?: int | null;
  regex?: string;
}

interface TextQuestion extends Question {
  min_length?: int | null;
  max_length?: int | null;
}

interface RadioQuestion extends Question {
  options: Option[];  // Non-empty
}

interface CheckboxQuestion extends Question {
  options: Option[];  // Non-empty
  min_choices?: int | null;
  max_choices?: int | null;
}

interface DropdownQuestion extends Question {
  options: Option[];
}

interface FileQuestion extends Question {
  extensions: string[];  // Accepts all extensions if empty
  max_size: int;  // in KB
  optional: boolean;
}

// Other types have no specific fields

interface Option {
  id: int;
  text: string;
}

interface Condition {
  oid: int;  // Option id; only radio / checkbox / dropdown questions can be referred
  negated: boolean;
}
```
