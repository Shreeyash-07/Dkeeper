import "./App.css";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import getBlockchain from "./ethereum";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function App() {
  const [loading, setLoading] = useState(false);
  const [currAC, setCurrAc] = useState("");
  const [currnetwork, setCurrNetwork] = useState(false);
  const [notes, setNotes] = useState([]);
  const init = async () => {
    try {
      if (window.ethereum) {
        const { note } = await getBlockchain();
        note
          .getNotes()
          .then((allNotes) => {
            setNotes(allNotes);
            console.log("Notes loaded");
          })
          .catch((err) => {
            console.log({ "Error in fetching notes:": err });
          });
      } else {
        console.log("Ethereum doesnt exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connect = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        console.log("Metamask not detedcted");
        return;
      }
      const { networkId, account } = await getBlockchain();
      setCurrAc(account[0]);
      setLoading(false);
      const rinkebyNetworkId = "4";
      console.log({ network: networkId, rinkebyNetwork: rinkebyNetworkId });
      if (networkId !== rinkebyNetworkId) {
        return;
      } else {
        setCurrNetwork(true);
      }
    } catch (err) {
      console.log({ "Error connecting to metamask:": err });
    }
  };

  useEffect(() => {
    init();
    console.log("control under useffect");
  }, []);

  async function addNote(newCNote) {
    let noteInstance = {
      title: newCNote.title,
      content: newCNote.content,
      isDeleted: false,
    };
    try {
      if (window.ethereum) {
        const { note } = await getBlockchain();
        await note.createNote(
          noteInstance.title,
          noteInstance.content,
          noteInstance.isDeleted
        );
        setNotes([...notes, noteInstance]);
      } else {
        console.log("Ethereum not detected");
      }
    } catch (err) {
      console.log({ "Insertion Error:": err });
    }
  }

  async function deleteNote(id) {
    console.log(id);
    const { note } = await getBlockchain();
    note
      .deleteNote(id, true)
      .then((response) => {
        console.log({ "Note Deleted Successfully": response });
      })
      .catch((err) => {
        console.log({ "Problem in deleting the note:": err });
      });
    const allNotes = await note.getNotes();
    setNotes(allNotes);
  }
  return (
    <div>
      <Header />
      {currAC === "" ? (
        <div className="middle_section">
          <LoadingButton
            onClick={connect}
            loading={loading}
            variant="outlined"
            style={{ borderColor: "#f5ba13", color: "#f5ba13" }}
          >
            Connect Wallet
          </LoadingButton>
        </div>
      ) : currnetwork === true ? (
        <>
          <CreateArea onAdd={addNote} />
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={noteItem.id}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })}
        </>
      ) : (
        <div className="middle_section">
          <Alert severity="error" style={{ width: "100%" }}>
            <AlertTitle>Network Error</AlertTitle>
            Please connect to the Rinkeby Testnet —{" "}
            <strong>and reload the page</strong>
          </Alert>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
