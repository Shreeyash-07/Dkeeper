async function main() {
  const Notes = await ethers.getContractFactory("Notes");
  const note = await Notes.deploy();

  await note.deployed();

  console.log("Notes deployed to:", note.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit = 1;
  });
