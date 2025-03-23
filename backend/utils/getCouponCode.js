export default function generateNewCode(now) {
  try {
    let codesList = now
      .split("")
      .map((char) => String.fromCharCode(Number(char) + 65));

    for (let i = 0; i < codesList.length; i++) {
      // Generate a random index
      const newIndex = Math.floor(Math.random() * (i + 1));

      // Swap the element at index with the random index
      const temp = codesList[i];
      codesList[i] = codesList[newIndex];
      codesList[newIndex] = temp;
    }

    return codesList.join("");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate coupon code");
  }
}
