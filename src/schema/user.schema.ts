import {
  getModelForClass,
  prop,
  pre,
  ReturnModelType,
  queryMethod,
  index,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import bcrypt from "bcrypt";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

//Pre decorator comes from Typegoose. @pre is used to set pre-hooks for documents and queries
// In Mongoose, pre and post middleware hooks are functions that are executed before or after a particular action that you specify. They are a way to add custom logic before or after various actions on your MongoDB data. 

@pre<User>("save", async function () {
  // Check that the password is being modified
  if (!this.isModified("password")) {
    return;
  }
  // The bcrypt.genSalt() function takes a number as an argument, which is the cost factor. The cost factor determines how long it takes to generate a hash. A higher cost factor makes it more difficult to crack a password, but it also takes longer to generate a hash.
  //When a user wants to log in, the application can retrieve the hashed password from the database and compare it to the password that the user entered. If the two passwords match, the user is authenticated.
  const salt = await bcrypt.genSalt(10);
  // This line hashes a user's password using the bcrypt library, combining the password with the previously generated salt. The hash function takes two arguments: the password (in this case, this.password) and the salt.
  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, {
    message: "password must be at least 6 characters long",
  })
  @MaxLength(50, {
    message: "password must not be longer than 50 characters",
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
