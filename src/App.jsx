import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  // State to store the name of the new friend
  let [newFriend, setNewFriend] = useState("");
  // State to store the list of all friends
  let [allfriend, setAllFriend] = useState([]);
  // State to manage assignment status (not used in this example)
  let [isAssign, setIsAssign] = useState(false);
  // Array of popular gifts
  let gifts = ["Gift Card", "Book", "Chocolate", "Perfume", "Gadget"];

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
        return [...arr, newFriend]; // Append the new friend's name to the allfriend array
      });
      setNewFriend(""); // Clear the input field after submission
    } else {
      alert("Friend name cannot be blank"); // Alert the user if the input is blank
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter friend name"
          value={newFriend}
          onChange={handleNewFriend}
        />
        <button>Gift</button>
      </form>
      <div>
        <ul>
          {allfriend.map((el, index) => {
            return (
              <li key={index}>
                {el} - {gifts[Math.floor(Math.random() * gifts.length)]}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
