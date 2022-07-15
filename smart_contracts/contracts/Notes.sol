// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Notes {

    event AddNote(address recipient,uint noteId);
    event DeleteNote(uint noteId,bool isDeleted);

    struct Note{
        uint id;
        string title;
        string content;
        bool isDeleted;
    }

    Note[] private notes;

    mapping(uint256 => address) noteToOwner;


    function createNote(string memory _title,string memory _content,bool isDeleted) external{
        uint noteId = notes.length;
        notes.push(Note(noteId,_title,_content,isDeleted));
        noteToOwner[noteId] = msg.sender;
        emit AddNote(msg.sender, noteId);
    }

    function getNotes() external view returns(Note[] memory){
        Note[] memory _notes = new Note[](notes.length);
        uint cnt = 0;
        for(uint i=0;i<notes.length;i++){
            if(noteToOwner[i] == msg.sender && notes[i].isDeleted == false){
                _notes[cnt] = notes[i];
                cnt++;
            }
        }
        Note[] memory resultNotes = new Note[](cnt);
        for(uint i=0;i<cnt;i++){
            resultNotes[i] = _notes[i];
        }
        return resultNotes;
    }

    function deleteNote(uint noteId,bool isDeleted) external {
        if(noteToOwner[noteId] == msg.sender){
            notes[noteId].isDeleted = isDeleted;
            emit DeleteNote(noteId,isDeleted);
        }
    }   
}
