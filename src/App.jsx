import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // State to store the name of the new friend
  let [newFriend, setNewFriend] = useState("");

  // State to store the list of all friends
  let [allfriend, setAllFriend] = useState([]);

  // State to manage assignment status (not used in this example)
  let [isAssign, setIsAssign] = useState(false);

  // Array of popular gifts
  let gifts = ["Gift Card", "Book", "Chocolate", "Perfume", "Gadget","Gift Card 2", "Book 2", "Chocolate 2", "Perfume 2", "Gadget 2"];

  // Function to handle changes in the input field
  let handleNewFriend = (event) => {
    setNewFriend(event.target.value); // Update the newFriend state with the input value
  };

  // Function to handle form submission
  let handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if the input is not empty before adding to the list
    if (newFriend.trim() !== "") {
      setAllFriend((arr) => {
        return [...arr, { name: newFriend, gift: "No gift assigned" }]; // Append the new friend's name and a random gift to the allfriend array
      });
      setNewFriend(""); // Clear the input field after submission
      setIsAssign(false);
    } else {
      alert("Friend name cannot be blank"); // Alert the user if the input is blank
    }
  };

  // Function to assign gifts to friends
  let assignGift = (event) => {
    if (!isAssign) {
      setAllFriend((arr) => {
        let newArr = arr.map((el) => {
          if (el.gift == "No gift assigned") {
            el.gift = gifts[Math.floor(Math.random() * gifts.length)];
          }
          return { ...el };
        });
        return [...newArr];
      });
      setIsAssign(true); // Update the isAssign state to true
    }
    else{
      alert("Gift already assigned !");     // alert if gift is already assigned to all
    }
  };

  let suffleGifts = (event) => {
    setAllFriend((arr) => {
      let newArr = arr.map((el) => {
          el.gift = gifts[Math.floor(Math.random() * gifts.length)];
        return { ...el };
      });
      return [...newArr];
    });
  };
  let reset = (event) => {
    setAllFriend((arr) => {
      let newArr = arr.map((el) => {
          el.gift =  "No gift assigned";
        return { ...el };
      });
      return [...newArr];
    });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter friend name"
          value={newFriend}
          onChange={handleNewFriend} // Update the newFriend state with the input value
        />
        <button>Add Person</button>
      </form>
      <div>
        <ul>
          {allfriend.map((el, index) => {
            return (
              <div key={index} className="friend-item">
                <li>
                  {el.name} - {el.gift}{" "}
                  {/* Display the friend's name and assigned gift */}
                </li>
                <button>Remove</button>
              </div>
            );
          })}
        </ul>
        <button onClick={assignGift}>Assign Gifts</button>
        <button onClick={suffleGifts}>Suffle Gifts</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}

export default App;
