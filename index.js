import mongoose, { Schema } from "mongoose";

const mongoDbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ikefuamakelechi:dDPFaPIlzOUQb0oU@cluster0.4eeef8e.mongodb.net/Person-Mongoose?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connection successful");
    queryChain();
  } catch (error) {
    console.log(error);
  }
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFood: [String],
});

//model
const People = mongoose.model("People", personSchema);

//create person
const createPersonAndSave = async () => {
  try {
    const person = new People({
      name: "Thankgod",
      age: 35,
      favoriteFood: ["rice", "beans"],
    });
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//task 3
const createManyPeople = async () => {
  const arrayOfPeople = [
    { name: "Daniel", age: 25, favoriteFood: ["Pizza", "Beans", "soup"] },
    { name: "Gad", age: 50, favoriteFood: ["Rice", "Yam", "soup"] },
  ];
  try {
    const people = await People.create(arrayOfPeople);
    console.log(people);
  } catch (error) {
    console.log(error);
  }
};

//find person
const findPersonByNmae = async () => {
  try {
    const person = await People.find({ name: "Gad" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//find 0ne by food
const findOneByFood = async () => {
  try {
    const person = await People.findOne({ favoriteFood: "Rice" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//find 0ne by Id
const findOneById = async () => {
  try {
    const person = await People.findById({
      _id: "6692f208e83eecdad4d0d478",
    });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//find and edit
const findEditThenSave = async () => {
  try {
    const person = await People.findById("6692f208e83eecdad4d0d478");
    person.favoriteFood.push("Potato");
    await person.save;
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//find and update
const findAndUpdate = async () => {
  try {
    const person = await People.findOneAndUpdate(
      { name: "Gad" },
      { age: 20 },
      { new: true }
    );
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//find and delete
const findAndDelete = async () => {
  try {
    const person = await People.findOneAndDelete({
      _id: "6692f208e83eecdad4d0d478",
    });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//remove many
const removeManyPeople = async () => {
  try {
    const person = await People.deleteMany({ name: "Daniel" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//chain search
const queryChain = async () => {
  try {
    const person = await People.find({ favoriteFood: "rice" })
      .sort({ name: "asc" })
      .limit(2)
      .select("-age")
      .exec();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};
mongoDbConnection();
