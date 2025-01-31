import React, { useState } from 'react';

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [tripDetails, setTripDetails] = useState({
    destination: '',
    startDate: '',
    endDate: '',
  });
  const [guidance, setGuidance] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    if (!tripDetails.destination) {
      setTripDetails((prevState) => ({
        ...prevState,
        destination: input,
      }));
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `AI: You are planning a trip to ${input}. Great! What are your start and end dates for this trip?`, sender: 'ai' },
      ]);
    } else if (!tripDetails.startDate || !tripDetails.endDate) {
      const dateMatch = input.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
      if (dateMatch) {
        const [_, day, month, year] = dateMatch;
        const date = new Date(year, month - 1, day);
        if (!tripDetails.startDate) {
          setTripDetails((prevState) => ({
            ...prevState,
            startDate: date,
          }));
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `AI: Your trip start date is set to ${date.toDateString()}. Now, what is your end date? (e.g., dd-mm-yyyy)`, sender: 'ai' },
          ]);
        } else if (!tripDetails.endDate) {
          setTripDetails((prevState) => ({
            ...prevState,
            endDate: date,
          }));
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `AI: Your trip end date is set to ${date.toDateString()}. Let me give you a trip guide!`, sender: 'ai' },
          ]);
          generateTripGuide();
        }
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'AI: Please provide a valid date in the format dd-mm-yyyy.', sender: 'ai' },
        ]);
      }
    }
  };

  const generateTripGuide = () => {
    const tripDuration = (new Date(tripDetails.endDate) - new Date(tripDetails.startDate)) / (1000 * 3600 * 24);
    let guideMessage = `AI: Your trip to ${tripDetails.destination} will be ${tripDuration} days long. Here's your itinerary:`;

    const destination = tripDetails.destination.toLowerCase();
    if (destination.includes('paris')) {
      guideMessage += `\nDay 1: Visit the Eiffel Tower.\nDay 2: Explore the Louvre Museum.\nDay 3: Go to Montmartre and visit Sacré-Cœur.\nDay 4: Take a Seine River cruise.`;
    } else if (destination.includes('tokyo')) {
      guideMessage += `\nDay 1: Visit Shibuya Crossing and Hachiko Statue.\nDay 2: Explore Senso-ji Temple.\nDay 3: Go to Tokyo Skytree.\nDay 4: Visit Akihabara for electronics and anime.`;
    } else if (destination.includes('new york')) {
      guideMessage += `\nDay 1: Visit Central Park.\nDay 2: Explore the Statue of Liberty.\nDay 3: See Times Square.\nDay 4: Visit the Metropolitan Museum of Art.`;
    } else {
      guideMessage += `\nDay 1: Explore the city’s landmarks.\nDay 2: Visit the popular tourist spots.\nDay 3: Experience the local cuisine and culture.\nDay 4: Take a scenic tour of the area.`;
    }

    setGuidance(guideMessage);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: guideMessage, sender: 'ai' },
    ]);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender}>{msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI something"
      />
      <button onClick={handleSendMessage}>Send</button>
      <div>{guidance && <p>{guidance}</p>}</div>
    </div>
  );
};

export default AIChat;
