import indent from '.';

test('It correctly drops template indentation', () => {
    expect(indent`
        Test ${"value"}
    `).toBe('Test value');
});

test('It works when there is no placeholders', () => {
    expect(indent`
        Test value
    `).toBe('Test value');
});

test('It reindent placeholders', () => {
    expect(indent`
        <test>
            ${"test\nvalue"}
        </test>
    `).toBe('<test>\n    test\n    value\n</test>');
});

test('Nested indent test', () => {
    const list = ['First', 'Second'];

    expect(indent`
        <test>
            ${list.map((name) => indent`
                <value>
                    ${name}
                </value>
            `).join('\n')}
        </test>
    `).toBe(`<test>\n    <value>\n        First\n    </value>\n    <value>\n        Second\n    </value>\n</test>`);
})
