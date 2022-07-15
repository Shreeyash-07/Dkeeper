const { expect } = require("chai");
const chai = require("chai");
const { ethers } = require("hardhat");
var should = chai.should();

describe("Notes contract", function () {
  let NotesContract;
  let notesContract;
  let owner;

  const NUM_TOTAL_NOTES = 5;

  let totalNotes;

  beforeEach(async function () {
    NotesContract = await ethers.getContractFactory("Notes");
    [owner] = await ethers.getSigners();
    notesContract = await NotesContract.deploy();

    totalNotes = [];

    for (let i = 0; i < NUM_TOTAL_NOTES; i++) {
      let note = {
        _title: "title no. 1" + i,
        _content: "content no. 1" + i,
        isDeleted: false,
      };

      await notesContract.createNote(
        note._title,
        note._content,
        note.isDeleted
      );
      totalNotes.push(note);
    }
  });

  describe("Add Note", function () {
    it("Should emit AddNote event", async function () {
      let note = {
        _title: "New title",
        _content: "New Content",
        isDeleted: false,
      };

      await expect(
        notesContract.createNote(note._title, note._content, note.isDeleted)
      )
        .to.emit(notesContract, "AddNote")
        .withArgs(owner.address, NUM_TOTAL_NOTES);
    });
  });

  describe("Get all notes", function () {
    it("should return the correct number of total notes", async function () {
      const noteFromChain = await notesContract.getNotes();
      expect(noteFromChain.length).to.equal(NUM_TOTAL_NOTES);
    });
  });

  describe("Delete Note", function () {
    it("Should emit delete task event", async function () {
      const NOTE_ID = 0;
      const NOTE_DELETED = true;
      const tx = await notesContract.deleteNote(NOTE_ID, NOTE_DELETED);
      await expect(tx)
        .to.emit(notesContract, "DeleteNote")
        .withArgs(NOTE_ID, NOTE_DELETED);
    });
  });
});
