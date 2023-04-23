**1. Explain what the simple List component does.**

Ans: List in this code is a user defined component. It displays a list of clickable items. It has two sub-components namely WrappedListComponent and WrappedSingleListItem. The memo function is used to create the List component by wrapping the WrappedListComponent component. This component gives a list of items as it takes "items" as a prop. WrappedSingleListItem has four four props namely "index", "isSelected", "onClickHandler" and "text". The List component renders WrappedListComponent to get the list of items and WrappedSingleListItem for individual items in the list of items. 

**2. What problems / warnings are there with code?**

`shapeOf` is not a function or method of `PropTypes`, instead shape is a function used for `PropTypes`

`Proptypes.arrayOf` in place of `PropTypes.array` because `PropTypes.arrayOf` is used to check if the prop being passed is an array containing elements of a specific data type.

The prop `items` passed inside `WrappedListComponent` is `null`. We need to pass some value in the form of array of strings for it to stop throwing error

`setSelectedIndex` is not a function rather it’s a variable but it is being used as a function. In place of `setSelectedIndex` we can use the defined  function `selectedIndex`

`isSelected` is assigned a function when the PropType given to it is boolean. This renders the use of useEffect useless.

`onClick` function is not defined correctly. So we have to modify it for our code to work
`onClickHandler` function is not defined correctly. So we have to modify it for our code to work

**3. Please fix, optimize, and/or modify the component as much as you think is necessary.**

The modified has:
1) only one Memoized component which is sufficient 
2) an option to add new items to the list of items
3) an option to delete any item the user wants 
