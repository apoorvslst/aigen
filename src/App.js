import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Input from './components/Input';
import Card from './components/Card';
import React,{useState} from 'react';
import imagg from './components/imgenhere.png'
function App() {
  const [prompt, setPrompt] = useState('');
  const [result,setResult] = useState(null);
  const [history,setHistory]=useState([]);
  const apikey=`FPSX1ef8317af94f241a87262dd82b975783`;

  const handleGenerate = async () => {
  try {
    const res = await fetch('https://cors-anywhere.herokuapp.com/https://api.freepik.com/v1/ai/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-freepik-api-key': apikey
      },
      body: JSON.stringify({
        prompt: prompt,
        num_images: 1,
        image: { size: "square_0.5_0.5" }
      })
    });

    if (!res.ok) {
      console.error("API error:", res.status, res.statusText);
      alert("Something went wrong with image generation. Please check your API key or CORS.");
      return;
    }

    const data = await res.json();
    console.log("API response:", data); // for debugging

    if (data?.data?.[0]?.base64) {
      const img = "data:image/png;base64," + data.data[0].base64;
      setResult(img);
      setHistory(prev => [img, ...prev]);
    } else {
      console.error("Empty or malformed image data:", data);
      alert("Image generation failed. Try another prompt.");
    }
  } catch (error) {
    console.error("Network or unexpected error:", error);
    alert("Failed to fetch the image. Please check your connection or try again later.");
  }
};

  const handledelete=()=>{
    setHistory([]);
  }
  const handledeleteone=(index)=>{
    setHistory(prev=>{
      const newhistory=([]);
      for(let i=0;i<prev.length;i++){
        if(i!==index){
          newhistory.push(prev[i]);
        }
      }
      return newhistory;
    });
  }
  return (
    <div className="App">
      <Navbar/>
      <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <Input prompt={prompt} setPrompt={setPrompt} onClick={handleGenerate}/>
          {
            history.length===0?(
              <img
              src={imagg}
              alt="Generated Image Here"
              style={{height:'500px',width:'auto'}}
              />
            ):(
              result &&(
             <div style={{marginRight :'20px'}} className="mt-4">
                <img
                  src={result}
                  alt="Generated"
                  style={{ width: '500px', height: 'auto', borderRadius: '10px' }}
                />
                <p style={{ fontSize: '14px' }}>AI Generates Image</p>
              </div>
          ))}
        </div>
        <div className="col-md-6">
          <Card onDelete={handledelete} images={history} onDeleteOne={handledeleteone}/>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
