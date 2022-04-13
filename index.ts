const indentTag = (strings: TemplateStringsArray, ... expressions: any[]) => {
    let parts: string[] = Array.from(strings);

    // Drop first line feed
    if ('\n' !== strings[0][0]) {
        throw new Error('Expect first character to be a line feed');
    }

    parts[0] = parts[0].slice(1);

    // Remove last line
    parts[strings.length - 1] = parts[parts.length - 1].replace(/\n[ \t]*$/, '');

    // Dedent using indent from first part
    const indent = parts[0].match(/^[ \t]*/)![0];

    const deindent = new RegExp(`(^|\n)${indent}`, 'g');

    parts = parts.map((string) => string.replace(deindent, '$1'));

    // Ensure expressions are strings
    const values = expressions.map((expression) => String(expression));

    // Reindent values
    const indented = values.map((value, index) => {
        const part = parts[index];

        const match = part.match(/\n( *)$/);

        // Only indent replacement if there is nothing before it on the line
        if (!match) {
            return value;
        }

        return value.replace(/\n/g, match[0]);
    })

    return parts.flatMap((part, index) => [part, indented[index]]).join('');
}

export default indentTag;
