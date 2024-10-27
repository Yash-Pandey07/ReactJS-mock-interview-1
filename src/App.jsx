import { useState } from "react";
import "./App.css";

function App() {
  // State to store the name of the new friend
  let [newFriend, setNewFriend] = useState("");

  // State to store the list of all friends
  let [allfriend, setAllFriend] = useState([]);

  // State to manage assignment status
  let [isAssign, setIsAssign] = useState(false);

  // Array of popular gifts
  let gifts = ["Gift Card", "Book", "Chocolate", "Perfume", "Gadget", "Gift Card 2", "Book 2", "Chocolate 2", "Perfume 2", "Gadget 2"];

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
        return [...arr, { name: newFriend, gift: "No gift assigned" }]; // Append the new friend's name and a default gift to the allfriend array
      });
      setNewFriend(""); // Clear the input field after submission
      setIsAssign(false); // Reset the assignment status
    }
  };

  // Function to update gifts based on the action
  let updateGifts = (action) => {
    setAllFriend((arr) => {
      let allAssigned = arr.every(el => el.gift !== "No gift assigned"); // Check if all friends have a gift assigned
      
      if (action === "assign" && !allAssigned) {
        let newArr = arr.map((el) => {
          if (el.gift === "No gift assigned") {         
            el.gift = gifts[Math.floor(Math.random() * gifts.length)]; // Assign a random gift if not already assigned
          }
          return el;
        });
        setIsAssign(true); // Update the isAssign state to true
        return [...newArr];
      } else if (action === "shuffle") {
        let newArr = arr.map((el) => {
          el.gift = gifts[Math.floor(Math.random() * gifts.length)]; // Shuffle the gift
          return el;
        });
        return [...newArr];
      } else if (action === "reset" && allAssigned) {
        let newArr = arr.map((el) => {
          el.gift = "No gift assigned"; // Reset the gift to default
          return el;
        });
        setIsAssign(false); // Reset the isAssign state
        return [...newArr];
      }
      return arr; // Return the original array without changes if conditions are not met
    });
  };

  // Function to remove a friend from the list
  let removeFriend = (index) => {
    setAllFriend((arr) => {
      let newArr = arr.filter((_, i) => i !== index); // Remove the friend at the specified index
      return [...newArr];
    });
  };

  return (
    <>
      <h1>Add friends and assign gifts!</h1>
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
                  {el.name} - {el.gift} {/* Display the friend's name and assigned gift */}
                </li>
                <button onClick={() => removeFriend(index)}>Remove</button>
              </div>
            );
          })}
        </ul>
        <button onClick={() => updateGifts("assign")}>Assign Gifts</button>
        <button onClick={() => updateGifts("shuffle")}>Shuffle Gifts</button>
        <button onClick={() => updateGifts("reset")}>Reset</button>
      </div>
    </>
  );
}

export default App;
