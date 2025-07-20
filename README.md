# Ziyy - Simple terminal styling.

Ziyy is a markup language that allows you to style your terminal using HTML-like syntax.

For information on using Ziyy, see the [Ziyy website](https://ziyy-dev.github.io).

## Usage

```js
import { style } from "ziyy";

const styled = style(`<b>Lorem
    <d> dolor sit
        <b>amet consectetur
            <d>adipiscing elit</d>
            quisque
        </b>faucibus ex sapien.`);
```
