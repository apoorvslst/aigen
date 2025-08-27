import React from 'react';

export default function Input({prompt,setPrompt,onClick}) {
  return (
    <div style={{width:'80%'}} className="input-group mb-3 ms-5">
      <input
        type="text"
        className="form-control"
        placeholder="Enter Prompt"
        aria-label="Enter Prompt"
        aria-describedby="button-addon2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="btn btn-success"
        type="button"
        id="button-addon2"
        onClick={onClick}
      >
        Generate
      </button>
    </div>
  );
}
