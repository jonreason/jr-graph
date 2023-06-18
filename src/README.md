[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)

# jr-graph

Creates a graph with a draggable point that can be used as a 2-axis controller.

## Demo

https://jonreason.github.io/jr-graph/demo/

## Install

```bash
npm i jr-graph
```

## Import
Client side only, no SSR. 


###main.js (example1):

```js
import { JrGraph } from 'jr-graph'
customElements.define('jr-graph', JrGraph);
```

depending on the setup, customElements.define() may need to be wrapped in useEffect (react) or onMounted (vue).

###App.vue (example2):

```js
import {JrGraph} from "jr-graph";

onMounted(function(){
    customElements.define("jr-graph", JrGraph);
})
```


###demo/index.html (example3):

```html
<script type="module">
    import '../jr-graph.js';
</script>
```

## Usage
Set optional attributes <code>width</code> and <code>height</code> to set the size of the graph.
Set attribute <code>grid</code> to display a grid.
Select the element and add an event listener for the 'update' event to get the x and y values.
Do something with the values, they update as the point is dragged.
```html
<jr-graph
    width="800"
    height="800"
    grid
></jr-graph>

let graph = document.querySelector('jr-graph');
graph.addEventListener('update', function () {
document.querySelector('body').style.filter =  "invert("+graph.point.y+")";
});
```