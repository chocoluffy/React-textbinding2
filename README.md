### Main improvement from last version ###

1. Added sensitive text info filter
when enter something like "yushunzhe" inside the input field, it will gives out a alarm notice implemented in Bootstrap.

2. Added a cool heartbeat effect
using CSS3, we can simulate the cool effect of haertbeat. Key idea here: use :before and :after with some animation functions.

## React学习笔记第二期 ##

#### 12.13之前react网站的一个拓展 ####

1\ 添加bootstrap特征的button等
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" />

[react教程模仿twitter的tweetbox](http://reactfordesigners.com/labs/reactjs-introduction-for-people-who-know-just-enough-jquery-to-get-by/)

 Don't worry about it for now. Basically, React.createClass creates a piece of UI with a name (in this case, TweetBox). This then gets attached to the DOM through React.render(<TweetBox />, document.body) - meaning this UI is added inside the body tag. That's all you need to know for now.

In the React land, we write the event handler as a method. Let's call it handleChange:
```
React.createClass({
  handleChange: function(event) {
  },
  render: function() {
    ...
  }
});

<textarea className="form-control"
          onChange={this.handleChange}></textarea>

```

The difference between Jquery and React, is that, every time we write Jquery, we will change the DOM, but in React, we only change the state.

2\ Add Button special effect

getInitialState: 在state里面设置了一个var, 通过this.state.buttonClicked来表明用户是否点击了button. 同时注意使用onClick针对button， 使用onChange针对text.

3\ react - props
有点像一个所有传入参数的hash， 只要通过它就可以access到传入的参数：
```
var FancyButton = React.createClass({
    render: function() {
        return <button onClick={this.props.onClick}>
            <i className={"fa " + this.props.icon}></i>
            <span>{this.props.text}</span>
        </button>
    }
});

var HelloWorld = React.createClass({
    getInitialState: function() {
        return {
            counter: 0
        };
    },
    
    increment: function() {
        this.setState({ counter: this.state.counter++ });
    },

    render: function() {
        return <div>
            <div>{this.state.counter}</div>
            <FancyButton text="Increment!" icon="fa-arrow-circle-o-up" onClick={this.increment} />
        </div>;
    }});
```
也就是在nested view 里面， 我们直接调用FancyButton的时候， 传入的text, icon, onClick位置的具体参数。这里面值得注意的是， 在onClick函数的地方， 我们传入了this.increment， 而这个HelloWorld component的函数也将会被FancyButton这个button使用， 我们把这个函数的范围扩展到了HelloWorld里面。

4\ flux
for retrieving data on the client side from a store of some sort on a remote server.
It’s a unidirectional data flow. At a high level, a user initiates an action, which the view handles by dispatching a request for data to a store. In turn, that store executes the request and when the data is retrieved, emits an event saying so to all that are listening. Those listeners update their views accordingly. Here are the main components:

emitter\dispatcher

使用react的一个好处: high-order function:
_.map(this.state.todos, function(todo) {
	return <item todo={todo} />
})

_.filter(this.)


5\ props and state:

props.state is the data that will change over time such as user interaction;
 However, sometimes a component needs to respond to external events such as user interaction, a server request, or the passage of time. For that kind of data, components should keep that in state. For data that will not change, components should keep that in props.

> React receive props from a parent component. which brings important parts of React, that, React sees components as functions. but notice that it is one way!

也就是说和3的理解差不多
在class1里面我return <Cats count={this.state.catcount}>

在另外一个react class Cats里面我们只需要调用this.props.count就可以了；
```
var Cats = React.createClass({
	render: function(){
	return (
		<li> number of cats: {this.props.count} </li>
		);
	}
})
```
对这个cat component来说， props（这里我们需要用到的是count这个变量是不会变化的）， 因此我们把它设为props而不是state.

其实这样有一个趋势， 就是从小到大， 记得传入的参数。

6\ react diff
[1] components of same class will generate similar trees;
[2] of different class will generate different trees; [better to remove it instantly then to check step by step]
[3] add unique keys to elements that stable across different renders. [when dealing with inserting, substituting, or removing element using Levenshtein distance, it is proven to have O(n^2) at its best]

react render function does not return DOM nodes, but return js object that represents DOM nodes, which are known as “virtual DOM”

```
var PetOwner = React.createClass({
	render: function(){
		if(this.props.likesCats){
			return (
				<div><span></span></div>
			)
		}
		else{
			return (
				<div><p></p></div>
			)
		}	
	}
})

var PetCity = React.createClass({
	return (
		<PetOwner likesCats={true} />
	)
})
```
pay attention, when implementing list!! In order to let react perform fast. we put an extra attribute “key” at the parent component. With these keys, React allows you to quickly reorder or destroy sibling elements. 

Attention (1):
#### key should be only placed in parent components! ####
For each list item:

```
var ListItem = React.createClass({
	render: function(){
		return (
			<li>{this.props.data}</li>
		)
	}
})

var List = React.createClass({
	render: function(){
		return (
			<ul>
			{this.props.results.map(function(result){
				return <ListItem key=“result.id” data=“result” />;
			})}
		)
	}
})
```

Attention (2):
#### React render function should return a tree structure ####

which means that we should return a single components(can have other elements nested inside it). But in general, it should be in a tree structure.

6\ event listener
instead of adding event handlers directly on DOM node, react attaches only one event listener on the root of document.


12.14 d3js with React
## recap on React: ##
 React acknowledges that client-side applications are really a collection of UI components that should react to events like user interaction.

React encourages building applications out of self-contained, reusable components that only care about a small piece of the UI. Many other frameworks attempt to do this such as Angular. React is different in that it enforces uni-directional data flow from parent component to child component. This makes debugging much easier.
## why use React with d3? ##
D3 is great at data visualizations, but it manipulates the DOM directly to display that data. Rendering DOM elements is where React shines. It uses a virtual representation of the DOM (virtual DOM) and uses a super performant diffing algorithm to determine the fastest way to update the DOM.

## How to use them? ##
Getting them to work together takes a bit of work but the strategy is fairly simple: since SVG lives in the DOM, let React handle displaying SVG representations of the data, while letting D3 handle all the math required to render the data.

## About JSX: ##
React sees HTML and client-side JavaScript as fundamentally bonded together. They're both concerned about one thing: rendering UI components to the user. They simply cannot be seperated without losing the ability to see what your component is going at a glance. The beauty of this approach is that you can describe exactly what your component will look like when it's rendered.

Now let's move on and mount our component to the DOM.
mount: /镶嵌， 指把create的component嵌入到dom里面/。

1. why require CSS file.
That's just a good practice just in case you want to do other things on the page other than render a React component.

2. about the code
setState explicitly tells React that we're changing some kind of state, triggering a re-render of the component and it's children. This essentially turns out UI components into state machines.

We're passing in our data which lives in the App component's state to the ScatterPlot as a property or prop, along with the settings object. ...settings is a convenient JSX and ES2015 spread operator that spread attributes of an array or object, instead of doing all of that explicitly. For more information check out: JSX Spread Attributes.

3. using d3.scale to do the math:
Let's talk about D3 scales. This is where D3 shines. Scales take care of doing all the messy math converting your data into a format that can be displayed on a chart. If you have a data point value 189281 but your chart is only 200 pixels wide, D3 scales will convert that number to a number you can use to plot that point.

4. when dealing with a lot of sibling elements:
In this component, we're rendering a g element, which is like the SVG equivalent to a div. Since we want to render a point for every set of X-Y coordinates, we're going to render multiple sibling elements, so we're wrapping it all in a g element for React to work. Inside of g, we're mapping over the data and rendering a circle for each one using renderCircles. renderCircles creates an SVG circle element which takes a number of properties. Here's we're setting the x and y coordinates (cx and cy respectively) with the D3 scales passed in from the ScatterPlot component. r is the radius of our circle, and key is something React requires us to do. Since we're rendering identical sibling components, React's diffing algorithm needs some kind of way to keep track of them as it updates the DOM over and over. I'm using node-uuid because it's an easy way to create a unique key for each element. You can use anything you like, as long as it's unique.

















































.
