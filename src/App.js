import { useEffect, useState } from "react";
import _ from "underscore";
import "./styles.css";

function TodoItem(props) {
  const { item, disabled } = props;
  const isDone = item.doneDate !== undefined;

  console.log(item);
  // var today = new Date();
  // const isDoneToday =
  //   item.doneDate !== undefined
  //     ? item.doneDate.toDateString() === today.toDateString()
  //     : false;
  return (
    <>
      <input
        type="checkbox"
        checked={isDone}
        disabled={disabled}
        onChange={() => {
          props.changeChecked(item.id, !isDone);
        }}
      ></input>
      <input
        disabled={disabled}
        value={item.label}
        onChange={(e) => {
          props.changeLabel(item.id, e.target.value);
        }}
      ></input>
      <span>{item.createdDate.toDateString()}</span>
    </>
  );
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function TodoList() {
  var today = new Date();
  var yesterday = new Date();
  var dayBeforeYes = new Date();
  var dayBeforedayBeforeYes = new Date();
  yesterday.setDate(today.getDate() - 1);
  dayBeforeYes.setDate(today.getDate() - 2);
  dayBeforedayBeforeYes.setDate(today.getDate() - 3);
  const storedItems =
    localStorage.getItem("items") === "null" ||
    localStorage.getItem("items") === null
      ? []
      : JSON.parse(localStorage.getItem("items"));

  storedItems.forEach((item) => {
    item.createdDate = new Date(item.createdDate);
    item.doneDate = item.doneDate ? new Date(item.doneDate) : undefined;
  });
  const [items, setItems] = useState(storedItems);

  console.log(storedItems, items);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const state = [
    {
      id: uuidv4(),
      label: "Do this",
      createdDate: today,
      doneDate: undefined
    },
    {
      id: uuidv4(),
      label: "Do this",
      createdDate: yesterday,
      doneDate: today
    },
    {
      id: uuidv4(),
      label: "Sunday 1",
      createdDate: dayBeforedayBeforeYes,
      doneDate: dayBeforeYes
    },
    {
      id: uuidv4(),
      label: "Sunday 2",
      createdDate: dayBeforedayBeforeYes,
      doneDate: dayBeforeYes
    },
    {
      id: uuidv4(),
      label: "Sunday 3",
      createdDate: dayBeforedayBeforeYes,
      doneDate: dayBeforeYes
    },
    {
      id: uuidv4(),
      label: "Sunday 4",
      createdDate: dayBeforedayBeforeYes,
      doneDate: yesterday
    },
    {
      id: uuidv4(),
      label: "Sunday 5",
      createdDate: dayBeforedayBeforeYes,
      doneDate: yesterday
    },
    {
      id: uuidv4(),
      label: "Do 1",
      createdDate: dayBeforeYes,
      doneDate: dayBeforeYes
    },
    {
      id: uuidv4(),
      label: "Do 2",
      createdDate: dayBeforeYes,
      doneDate: yesterday
    },
    {
      id: uuidv4(),
      label: "Do 3",
      createdDate: dayBeforeYes,
      doneDate: yesterday
    },
    {
      id: uuidv4(),
      label: "Do 4",
      createdDate: dayBeforeYes,
      doneDate: yesterday
    },
    {
      id: uuidv4(),
      label: "Do 5",
      createdDate: dayBeforeYes,
      doneDate: yesterday
    },
    {
      id: uuidv4(),
      label: "Do 6",
      createdDate: dayBeforeYes,
      doneDate: undefined
    }
  ];

  const groupedItems = _.groupBy(items, (item) => {
    return item.doneDate ? item.doneDate.toDateString() : "notDone";
  });

  const itemsToShow = [];

  // if (groupedItems.notDone !== undefined) {
  // }

  // if (groupedItems[today.toDateString()] !== undefined) {
  //   itemsToShow.push(...groupedItems[today.toDateString()]);
  // }

  const rest = {};

  Object.keys(groupedItems).map((key) => {
    if (key === "notDone") {
      itemsToShow.push(...groupedItems.notDone);
    } else if (key === today.toDateString()) {
      itemsToShow.push(...groupedItems[key]);
    } else {
      rest[key] = groupedItems[key];
    }
  });

  const sortedRest = {};

  const sortedKeys = Object.keys(rest).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  sortedKeys.forEach((key) => {
    sortedRest[key] = rest[key];
  });

  console.log(itemsToShow);

  return (
    <>
      <ul>
        {itemsToShow.map((item) => {
          return (
            <li key={item.id}>
              <TodoItem
                item={item}
                changeLabel={(id, val) => {
                  item = items.find((item) => item.id === id);
                  item.label = val;
                  // console.log(items);
                  setItems([...items]);
                }}
                changeChecked={(id, val) => {
                  item = items.find((item) => item.id === id);
                  if (val === true) {
                    item.doneDate = new Date();
                  } else {
                    item.doneDate = undefined;
                  }
                  // console.log(items);
                  setItems([...items]);
                }}
              />
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          var itemsClone = [...items];
          itemsClone.push({
            id: uuidv4(),
            label: "Do that",
            createdDate: new Date(),
            doneDate: undefined
          });
          // console.log(itemsClone);
          setItems(itemsClone);
        }}
      >
        Add
      </button>
      {Object.keys(sortedRest).map((date) => {
        return (
          <div key={date}>
            <h5>{date}</h5>
            {sortedRest[date].map((todoItem) => {
              return (
                <li key={todoItem.id}>
                  <TodoItem disabled item={todoItem} />
                </li>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default function App() {
  return (
    <>
      <TodoList />
    </>
  );
}
