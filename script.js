const form = document.getElementById('letterForm');
const output = document.getElementById('output');
const letterText = document.getElementById('letterText');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const letterType = document.getElementById('letterType').value;
  const tone = document.getElementById('tone').value;
  const details = document.getElementById('details').value;

  const prompt = `Write a ${tone} ${letterType.replace('cover', 'job cover')} letter. Here are the details: ${details}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_OPENAI_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500
    })
  });

  const data = await response.json();
  const letter = data.choices?.[0]?.message?.content || "Something went wrong.";

  letterText.textContent = letter;
  output.classList.remove('hidden');
});

function copyLetter() {
  const text = letterText.textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}
