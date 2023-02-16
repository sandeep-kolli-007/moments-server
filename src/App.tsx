import React, { useEffect, useState } from 'react';
import {
  IonApp,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import io from 'socket.io-client';
import {Button, Col, Form, Row} from 'react-bootstrap'


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

//
import './App.scss'

setupIonicReact();

// const App: React.FC = () => {
//     const [name, setName] = useState()
//     const socket = io('http://localhost:3001');
//     useEffect(() => {
//      socket.on("connect", () => {
//       console.log(socket.id); // x8WIv7-mJelg7on_ALbx
//     });
//     socket.connect();
//     }, [])
    
   
//   // socket.emit('set-name', name);
//   // socket.emit('send-message', { text: "message" });
//   // socket.on('users-changed',(r)=>{
//   //   console.log(r.user)
//   // })
//   // socket.on('message',(r)=>{
//   //   console.log(r)
//   // })
//   return (
//    <div>
//      {/* <IonItem>
//         <IonLabel>Default label</IonLabel>
//         <IonInput placeholder="Enter text"></IonInput>
//       </IonItem> */}
//       <input type="text" onChange={(e:any)=>{setName(e.target.value)}}/>
//       <button onClick={()=>{socket.emit('set-name', name);}}>set name</button>
//    </div>
//   );
// };

// export default App;



 

const socket = io('http://localhost:3001');

function App() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState('');
  const [sender, setSender] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    socket.on("connect", () => {
             console.log(socket.id); // x8WIv7-mJelg7on_ALbx
             setId(socket.id)
          });
    socket.on('chat message', (msg:any) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleInput = (e:any) => {
    setInput(e.target.value);
  };

  const handleSender = (e:any) => {
    setSender(e.target.value);
  };

  const handleSubmit = (e:any) => {
    
       e.preventDefault();
    socket.emit('chat message', { message: input, sender: sender,id:id });
    setInput('');
    
   
  };

  return (
  <Row className='app'>
    <div style={{height:"100vh"}}>
      
    
  <div style={{position: "fixed",width:"100%",
    bottom: "16px"}}>
      
        {messages.map((msg:any, i:number) => (
          
      
      <div className={`chat-bubble-block row  m-0 px-3 ${msg.id === id ?'justify-content-end':"justify-content-start"}`}>
      <div className='chat-bubble col-6'>
      <p className='m-0 p-2 text-white' key={i}>{msg.id === id ?"you": "stranger"}: {msg.message}</p>
      </div>
      </div>  
      ))}
       
      <Row className='mx-0'>
         <Col><input className='form-control w-100' type="text" value={input} onChange={handleInput} placeholder="Enter your message" /></Col>
        <Button  className="col-2 me-2" onClick={(e)=>{handleSubmit(e)}}>Send</Button>
      </Row>
   
 </div>
        {/* <input type="text" value={sender} onChange={handleSender} placeholder="Enter your name" /> */}
        
    
    </div> 
    </Row>
  );
}

export default App;