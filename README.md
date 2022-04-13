# indent-tag

A template literal tag that automagically reindents placeholders.

The goal of this package is to allow nice code indenting of your template
literals while still producing nicely indented strings as the result.

For example, the following code:

```js
import indent from 'indent-tag';

const list = ['First', 'Second'];

indent`
    <test>
        ${list.map((name) => indent`
            <value>
                ${name}
            </value>
        `).join('\n')}
    </test>
`
```

will result in the following string:

```
<test>
    <value>
        First
    </value>
    <value>
        Second
    </value>
</test>
````

this package makes a few opiniated choices of how it will interpret the code
indentation:
- There must be a new line directly following the start of the template
- The closing tag should be on a line containing only indentation

## How it works

- First it treats the start and end of the template to remove the lines
  that contains the backticks.
- Then it removes the indentation of each line base on the indentation of the
  first line.
- Finaly, it indents strings that are passed into the placeholders based of the
  indentation preceding them.
