import React, { useState, memo } from 'react';
import { Button, Card, Input } from "reactstrap";
import PropTypes from 'prop-types';
import "./List.css";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, onDelete, text }) => {
    return (
        <li
            className="list-item"
            style={{ backgroundColor: isSelected ? 'green' : 'red' }}
            onClick={() => onClickHandler(index)}
        >
            {text}
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index)
                }
                }>Delete</Button>
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

// const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
    const [setSelectedIndex, selectedIndex] = useState(null);
    const [newItems, setNewItems] = useState(items);
    const [query, setQuery] = useState("");

    const handleClick = index => {
        selectedIndex(index);
    };

    const deleteItem = index => {
        const newItemsList = [...newItems];
        newItemsList.splice(index, 1);
        setNewItems(newItemsList);
        setSelectedIndex(null);
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

