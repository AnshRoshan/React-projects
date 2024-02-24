import { useEffect } from "react";
import { useState } from "react";
import { FaRepeat } from "react-icons/fa6";
import { FaClipboard } from "react-icons/fa";
function PassGen() {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const [uppercaseChecked, setUppercaseChecked] = useState(true);
  const [lowercaseChecked, setLowercaseChecked] = useState(true);
  const [numbersChecked, setNumbersChecked] = useState(true);
  const [symbolsChecked, setSymbolsChecked] = useState(true);
  const [newPassword, setNewPassword] = useState(false);
  const [password, setPassword] = useState("Alpha123!");
  const [length, setLength] = useState(16);

  useEffect(() => {
    const generatePassword = (length) => {
      let allChars = ""; // Initialize empty string for all characters

      // Check which character sets are selected and add them to allChars
      if (uppercaseChecked) {
        allChars += uppercaseChars;
      }
      if (lowercaseChecked) {
        allChars += lowercaseChars;
      }
      if (numbersChecked) {
        allChars += numberChars;
      }
      if (symbolsChecked) {
        allChars += symbolChars;
      }

      // Handle case where no character sets are selected
      if (allChars === "") {
        alert("Please select at least one character set to generate a password.");
        return; // Prevent generation if no sets are chosen
      }

      let password = "";
      for (let i = 0; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
      }
      setPassword(password);
    };

    generatePassword(length)
  }, [uppercaseChecked, lowercaseChecked, numbersChecked, symbolsChecked, length, newPassword]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard:', text);
        // Optionally, you can show a success message to the user
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard:', err);
        // Handle any errors here, such as browser support or permissions
      });
  };


  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen flex items-center justify-center ">
      <div className="container bg-slate-900 rounded-lg p-8">
        <h1 className="text-4xl text-white font-bold text-center mb-4">Password Generator</h1>
        <div className="flex flex-col justify-center  p-8 rounded-lg border-2 border-b-dashed">
          <div className="flex items-center justify-center space-x-3">
            <input type="text" id="password" value={password} className="text-center flex-grow w-full bg-teal-200 rounded-full" onChange={(e) => { setLength(e.target.value.length); setPassword(e.target.value) }} />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded flex items-center justify-center p-1"
              onClick={() => copyToClipboard(password)}
            >
              <FaClipboard />
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded flex items-center justify-center p-1"
              onClick={() => setNewPassword(!newPassword)}
            >
              <FaRepeat />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="range"
              id="length"
              min="8"
              max="36"
              value={length}
              className="w-4/5  rounded-full mx-2 my-4"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length" className="text-white">
              Length: {length}
            </label>
          </div>
          <div className="options">
            <div className="options space-x-2 text-text">
              <input
                type="checkbox"
                id="uppercase"
                defaultChecked={uppercaseChecked}
                checked={uppercaseChecked}
                onChange={(e) => setUppercaseChecked(e.target.checked)}
                className="form-checkbox abb text-purple-200 bg-teal-200 rounded-full "
              />
              <label htmlFor="uppercase">Uppercase</label>

              <input
                type="checkbox"
                id="lowercase"
                defaultChecked={lowercaseChecked}
                checked={lowercaseChecked}
                onChange={(e) => setLowercaseChecked(e.target.checked)}
              />
              <label htmlFor="lowercase">Lowercase</label>

              <input
                type="checkbox"
                id="numbers"
                defaultChecked={numbersChecked}
                checked={numbersChecked}
                onChange={(e) => setNumbersChecked(e.target.checked)}
              />
              <label htmlFor="numbers">Numbers</label>

              <input
                type="checkbox"
                id="symbols"
                defaultChecked={symbolsChecked}
                checked={symbolsChecked}
                onChange={(e) => setSymbolsChecked(e.target.checked)}
              />
              <label htmlFor="symbols">Symbols</label>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
}

export default PassGen; 
