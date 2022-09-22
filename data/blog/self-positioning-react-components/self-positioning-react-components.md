---
title: Self Positioning React Components
description: >-
  A big thanks to Dexter engineering specifically Daniel Ilkovich and David Hu
  for letting me share this code and all of their help and…
date: 2017-08-23T19:39:10.717Z
tags:
  - posts
  - react
  - DOM
  - ref
  - useRef
categories: []
keywords: []
author: 'Benjamin Schachter'
---

<Image alt="react.js logo" src="/static/images/1__jDIj2SKAE__Bp32owLoHDjw.png" width={700} height={400} />

A big thanks to [Dexter](https://medium.com/u/10e7d71b6655) engineering specifically [Daniel Ilkovich](https://medium.com/u/5509cf8da295) and [David Hu](https://medium.com/u/41dac176c234) for letting me share this code and all of their help and support while building the user tutorial feature on our [site](http://rundexter.com).

While React has ways to break the hatch and directly manipulate the DOM there are very few reasons to do this. We shouldn’t directly manipulate the DOM unless we have a really good reason to. When we need to we should use the `ref` property. Only as a last resort should we manipulate the DOM directly as well as change state during a render.

### The Problem

The grid snaps at 1024px from a fixed to a fluid grid. We wanted our tutorial tips to be 20px away from their parent element and there wasn’t a way to do this with just css. If the tip was positioned correctly in the fixed grid it would be off when the grid snapped to a fluid view.

The tutorial metadata is applied directly in inline styles of the component which has the highest css specificity. This meant that media queries couldn’t solve this problem because media queries would be overridden by css with higher specificity.
<br/>
[youtube link of the problem](https://youtu.be/9VkbXWANxvQ)

### The Solution

The solution needed to be a single set of metadata and a component that knew where it was so it could change its positioning on the fly. Here’s a video of the final component styles changing.
<br/>
[youtube link of solution](https://youtu.be/BFkJ4KjBWPo)

and the component moving with the viewport resize.

<Image alt="react.js logo" src="https://img.youtube.com/vi/OwGAaxtAmaQ/0.jpg" width={700} height={400} />

### Element.getClientRects()

First things first, we need to know where the parent element is on the page before we can do anything with it. The `.getClientRects()` [method](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) does just that. If you query an element on the DOM and call `.getClientRects()` it’ll return an object of values with the position, height and width of that element in relation to the viewport of the browser. Give it a try on your end.

![](/Users/benjaminschachter/Downloads/medium-export-53ea0a62798a34a070e02ba6c20fabcaa79f4d6071252b2620cbac428dd8bde9/posts/md_1652096354662/img/1__EkU__yoIB4aWoSRX11jYIiw.png)

<Image alt="react.js logo" src="/static/images/1__EkU__yoIB4aWoSRX11jYIiw.png" width={700} height={400} />
### Using a Stateful Component to store positioning

We need the component to know where it is at all times. Thinking about that requirement we need a `class` component that can hold its own state, not a stateless functional component. This is because the user can shrink or expand their viewport past or less than the 1024px threshold which changes our grid to fluid or fixed position. The component needs to be aware of viewport size so it can hold on to its dynamically generated positioning any time the screen size changes.

### Getters and Setters

The component has two core functions around dynamic positioning. Setting styles dynamically in relation to where the parent element is on the screen and getting those set styles to render the position of the tip. We’ve named these function methods `getStyles` and `setStyles`.

```js
/**
 * Method for tutorial tip to dynamically set position based on state.
 *
 * @return {object} with tutorialTip dynamic position style values
 */
, getStyles: function () {
  var self = this
    , styles = {
      top        : self.state.top    || 'auto'
      , bottom   : self.state.bottom || 'auto'
      // (We'll talk about this positioning later)
      , left     : self.state.left   || -9999
      , right    : self.state.right  || 'auto'
    }
    ;
  // Hide tutorial tip during transitions to prevent flickering. (We'll talk about this later)
  if (!this.state.display) {
    styles.display = 'none';
  }

  return styles;
}
```

```js
/**
 * Queries the DOM and dynamically generates values to update state. These values are passed to getStyles
 * to update positioning.
 *
 * @return {void} function mutates state.
 */
  , setStyles: function () {
    var {step} = this.props
      , meta = tutorialMeta[step]
      // (We'll talk about this later)
      , el = document.querySelector('.step' + step)
      // Get queried DOM element's values (top, right, left, width, etc.)
      , bounds = el && el.getBoundingClientRect()
      ;

    if (bounds) {
      switch (meta.position) {
        case 'right':
          this.setState({
            top: Math.floor(bounds.top - meta.offsetTop)
            , left: Math.floor((bounds.right) + meta.offsetLeft)
            , display: true
          });
          break;
        case 'left':
          this.setState({
            top: Math.floor(bounds.top - meta.offsetTop)
            , left: Math.floor((bounds.left) + meta.offsetLeft)
            , display: true
          });
          break;
        case 'bottom':
          this.setState({
            top: Math.floor(bounds.top - meta.offsetTop)
            , left: Math.floor((bounds.right - bounds.width) + meta.offsetLeft)
            , display: true
          });
          break;
        case 'bottom-left':
          this.setState({
            top: Math.floor(bounds.top - meta.offsetTop)
            , left: Math.floor((bounds.right - bounds.width) + meta.offsetLeft)
            , display: true
          });
          break;
        default:
          break;
      }
    }
  }
```

In this particular use cases we load in `tutorialMeta` JSON data for each tutorial tip and `setState` accordingly for each tip positioning type. **Note:** This isn’t a requirement for a self positioning component itself. Just information for the tutorial. Examples are instruction text and offset positioning so the tip is 20px away from it’s parent element and centered.

Now, it’s time to take this functionality and hook it into React’s lifecycle methods so the component know’s when to update its own positioning.

### Connecting to React’s Life Cycle Methods

Let’s hook up our getters and setters so our component knows when to fire them and update its props and state.

Initialization and Destruction:

```js
componentDidMount: function () {
  window.addEventListener('resize', this.setStyles);
  this.setStyles();
}
, componentWillUnmount: function () {
  window.removeEventListener('resize', this.setStyles);
}
```

On component load we need to `setStyles` since we currently don’t have any styles to get! Remember, the component is going to call `.getClientRect()` which is going to dynamically set positioning values. Additionally, we don’t want to query the DOM every time we resize the viewport.

```js
  , shouldComponentUpdate: function (nextProps, nextState) {
    //  We use use lodash at work for convenience methods like isEqual
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
  }

  , componentWillReceiveProps: function (nextProps) {
    if (nextProps.step !== this.props.step) {
      // Step has changed, hide the tutorial box
      this.replaceState({
        display: false
      });
    }
  }
```

We check if our props or state has changed. `shouldComponentUpdate`'s default is to return true if any state changed per React’s [docs](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate). Since we’re also getting data from our container component as props we also need to check for props updates. **Note:** There is global dispatch and data for the entire tutorial like `nextStep` and `currentStep` this isn’t a requirement for every use case, just the one that we we’re solving for.

Next up `componentWillReceiveProps` is fired before a mounted component receives new props ([docs](https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops)). Using `replaceState` rather than `setState` blows away state and sets the component to not show. This is also for a very specific and deliberate for our use case, the flickering problem.

### There was a flickering problem

The dreaded flicker! It was ever so subtle, but it made our team twitch. There was a flash on initial load and when transitioning the tutorial tip it would hangout just one render step before where it was supposed to be.

**The Flash Flicker:** That’s where the `-9999` position came in. If there’s no positioning to give our component just make sure it’s off the page entirely.

**The Hanging Flicker:** Every time we get new props the component sets our display to false removing the component from the DOM entirely during transitions. If you look in `componentWillRecieveProps` , `setStyles` and `getStyles` you’ll see reference to how the component is removed and added with `display` set to false or true.

### The Render

This is the function that’s going to get our dynamically generated styles which is called in the styles `props`. **Note:** `_.getClassNameFromObject` is our own custom function that’ll create a string which we can add to a component class styles. We’re not going to dig into this function because it’s out of scope of the post. But, if you’re interested please leave a comment on the bottom of the post and I’ll try and answer your questions.

```js

, render: function () {
    let {step} = this.props;
    var props = this.props
      , meta = tutorialMeta[step]
      , parentClass = _.getClassNameFromObject({
        'tutorial-wrap': true
      })
      , childClass = _.getClassNameFromObject({
        'tutorial-tip': true
        , 'top'     : _.isEqual(_.get(meta, 'position'), 'top')
        , 'right'   : _.isEqual(_.get(meta, 'position'), 'right')
        , 'bottom'  : _.isEqual(_.get(meta, 'position'), 'bottom')
        , 'left'    : _.isEqual(_.get(meta, 'position'), 'left')
        , 'bottom-left':  _.isEqual(_.get(meta, 'position'), 'bottom-left')
      })
      , text = props.error ? meta.error : meta.text
      , btnCls = _.getClassNameFromObject({
        'btn btn-special btn--short next': meta.nextButton
        , 'hidden': !meta.nextButton
      })
      ;

    if (!props.visible) return null;

    return (
      <div className={parentClass}>
        <div className={childClass} style={this.getStyles()}>
          <div>
            <div className="step-info">
              <span><span className="step"><i className="fa fa-question-circle" aria-hidden="true"></i>
              &nbsp; Step {props.step + 1}</span> of {tutorialMeta.length}</span>
            </div>
            <div className="step-text">
              <span dangerouslySetInnerHTML={{__html: text}}></span>
            </div>
            <div className="end-tutorial">
              <a className="clickable" onClick={props.onTutorialFinish}>End tutorial</a>
                <button className={btnCls} onClick={props.onTutorialNext}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
```

Here’s a diagram of our component lifecycle, getters, setters and render methods.

![](/Users/benjaminschachter/Downloads/medium-export-53ea0a62798a34a070e02ba6c20fabcaa79f4d6071252b2620cbac428dd8bde9/posts/md_1652096354662/img/1__nMWbkf4UI35QyiTOTl1WWA.png)

<Image alt="react.js logo" src="/static/images/1__nMWbkf4UI35QyiTOTl1WWA.png" width={700} height={400} />
### The Entire Component

```js
var React = require('react'),
  _ = require('lodash'),
  tutorialMeta = require('./tutorialMeta.json').tutorial

/**
 * Tutorial Component
 * @class TutorialTip
 * @param {props} object that holds global data to render component.
 * @param {element} element to put tutorial tip around.
 *
 * @return {element} with tutorialTip
 */

module.exports = React.createClass({
  getInitialState: function () {
    return { display: true }
  },
  componentDidMount: function () {
    window.addEventListener('resize', this.setStyles)
    this.setStyles()
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this.setStyles)
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.step !== this.props.step) {
      // Step has changed, hide the tutorial box
      this.replaceState({
        display: false,
      })
    }
  },
  /**
   * Method for tutorial tip to dynamically set position based on state.
   *
   * @return {object} with tutorialTip dynamic position style values
   */
  getStyles: function () {
    var self = this,
      styles = {
        top: self.state.top || 'auto',
        bottom: self.state.bottom || 'auto',
        left: self.state.left || -9999,
        right: self.state.right || 'auto',
      }
    // Hide tutorial tip during transitions to prevent flickering.
    if (!this.state.display) {
      styles.display = 'none'
    }

    return styles
  },
  componentDidUpdate: function () {
    this.setStyles()
  },
  /**
   * Queries the DOM and dynamically generates values to update state. These values are passed to getStyles
   * to update positioning.
   *
   * @return {void} function mutates state.
   */
  setStyles: function () {
    var { step } = this.props,
      meta = tutorialMeta[step],
      el = document.querySelector('.step' + step),
      // Get queried DOM element's values (top, right, left, width, etc.)
      bounds = el && el.getBoundingClientRect()
    if (bounds) {
      switch (meta.position) {
        case 'right':
          this.setState({
            top: Math.floor(bounds.top - meta.offsetTop),
            left: Math.floor(bounds.right + meta.offsetLeft),
            display: true,
          })
          break
        case 'left':
          this.setState({
            top: Math.floor(bounds.top - meta.offsetTop),
            left: Math.floor(bounds.left + meta.offsetLeft),
            display: true,
          })
          break
        case 'bottom':
          this.setState({
            top: Math.floor(bounds.top - meta.offsetTop),
            left: Math.floor(bounds.right - bounds.width + meta.offsetLeft),
            display: true,
          })
          break
        case 'bottom-left':
          this.setState({
            top: Math.floor(bounds.top - meta.offsetTop),
            left: Math.floor(bounds.right - bounds.width + meta.offsetLeft),
            display: true,
          })
          break
        default:
          break
      }
    }
  },
  render: function () {
    let { step } = this.props
    var props = this.props,
      meta = tutorialMeta[step],
      parentClass = _.getClassNameFromObject({
        'tutorial-wrap': true,
      }),
      childClass = _.getClassNameFromObject({
        'tutorial-tip': true,
        top: _.isEqual(_.get(meta, 'position'), 'top'),
        right: _.isEqual(_.get(meta, 'position'), 'right'),
        bottom: _.isEqual(_.get(meta, 'position'), 'bottom'),
        left: _.isEqual(_.get(meta, 'position'), 'left'),
        'bottom-left': _.isEqual(_.get(meta, 'position'), 'bottom-left'),
      }),
      text = props.error ? meta.error : meta.text,
      btnCls = _.getClassNameFromObject({
        'btn btn-special btn--short next': meta.nextButton,
        hidden: !meta.nextButton,
      })
    if (!props.visible) return null

    return (
      <div className={parentClass}>
        <div className={childClass} style={this.getStyles()}>
          <div>
            <div className="step-info">
              <span>
                <span className="step">
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                  &nbsp; Step {props.step + 1}
                </span>{' '}
                of {tutorialMeta.length}
              </span>
            </div>
            <div className="step-text">
              <span dangerouslySetInnerHTML={{ __html: text }}></span>
            </div>
            <div className="end-tutorial">
              <a className="clickable" onClick={props.onTutorialFinish}>
                End tutorial
              </a>
              <button className={btnCls} onClick={props.onTutorialNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
})
```

### But wait there’s more!

We also came up with an interesting solution to avoid adding components all over our application. This is useful if you need to add a series of components to your application like a tutorial.

In `setStyles` we query the DOM for a specific step rather than include the component multiple times. The container component renders the component once, then on each step change we look for a different step class to render the tutorial component.

### That’s all folks

Hopefully this helps anyone how might need this type of dynamic positioning functionality in their React application.
