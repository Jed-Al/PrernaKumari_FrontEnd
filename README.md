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

The modified code has:
1) only one Memoized component which is sufficient 
2) an option to add new items to the list of items
3) an option to delete any item the user wants
4) a more pleasing look

 
```js
import React, { useState, memo } from 'react';
import { Button, Card, Input } from "reactstrap";
import PropTypes from 'prop-types';
import "./List.css";


const WrappedSingleListItem = ({ index, isSelected, onClickHandler, onDelete, text }) => {
    return (
        <li
            className="list-item"
            style={{ backgroundColor: isSelected ? 'green' : 'red' }}
            onClick={() => onClickHandler(index)}
        >
            {text}
            <Button
                onClick={() => onDelete(index)}>Delete</Button>
        </li>
    );
};

WrappedSingleListItem.propTypes = {
    index: PropTypes.number,
    isSelected: PropTypes.bool,
    onClickHandler: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
};


const WrappedListComponent = ({ items }) => {
    const [setSelectedIndex, selectedIndex] = useState(null);
    const [newItems, setNewItems] = useState(items);
    const [query, setQuery] = useState("");

    const handleClick = index => {
        selectedIndex(index);
    };

    const deleteItem = index => {
        newItems.splice(index, 1);
        selectedIndex(null);
        setNewItems(newItems);
    };

    const addItem = () => {
        if (query.length === 0) return;
        const newItem = { text: query }
        const newItemsList = [...newItems, newItem];
        setNewItems(newItemsList);
        console.log(newItemsList)
    }

    return (
        <div className="home-container">
            <Card className="list-container">
                <h1 className="heading-of-list">List of Items</h1>
                <div className="input-card">
                    <Input
                        className="input-item"
                        placeholder="Item to be added goes here..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}>
                    </Input>
                    <Button
                        className="add-item-button"
                        onClick={addItem}>Add</Button>
                </div>
                <ul style={{ textAlign: 'left' }} >
                    {newItems.map((item, index) => (
                        <WrappedSingleListItem
                            key={index}
                            onClickHandler={() => handleClick(index)}
                            text={item.text}
                            index={index}
                            isSelected={setSelectedIndex === index}
                            onDelete={() => deleteItem(index)}
                        />
                    ))}
                </ul>
            </Card>
        </div>
    )
};

WrappedListComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
    })),
};

WrappedListComponent.defaultProps = {
    items: [{ text: "Item 1" }, { text: "Item 2" }, { text: "Item 3" }, { text: "Item 4" }, { text: "Item 5" }, { text: "Item 6" }]
};

const List = memo(WrappedListComponent);

export default List;

```
